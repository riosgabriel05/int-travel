import TripManager from "./domain/tripManager.ts";
import City from "./domain/city.ts";
import Accommodation from "./domain/accommodation.ts";

const manager = new TripManager();
const form = document.getElementById("city-form") as HTMLFormElement | null;
const citiesTbody = document.getElementById(
  "cities-tbody",
) as HTMLTableSectionElement | null;

form?.addEventListener("submit", handleCityFormSubmit);

function renderCities(): void {
  if (!citiesTbody) return;
  citiesTbody.innerHTML = "";
  manager.getAllCities().forEach((city, i) => {
    const tr = document.createElement("tr");
    tr.dataset.index = String(i);
    const dateFrom = formatDateIso(city.getDateFrom ? city.getDateFrom() : "");
    const dateTo = formatDateIso(city.getDateTo ? city.getDateTo() : "");
    const country = city.getCountry ? city.getCountry() || "" : "";
    const duration = city.getDurationDays() ? city.getDurationDays() : "";
    const notesText = city.getNotes ? String(city.getNotes() || "") : "";
    const notesHtml = notesText
      ? notesText
      : '<span class="text-muted">Sin datos</span>';
    tr.innerHTML = `<td>
    <strong>${city.getName()}</strong>
    </td>
    <td>${country}</td>
    <td>${duration ? `${duration} días` : "—"}</td>
    <td>${dateFrom}</td>
    <td>${dateTo}</td>
    <td>${notesHtml}</td>`;
    citiesTbody.appendChild(tr);
  });
}

function handleCityFormSubmit(e: SubmitEvent): void {
  e.preventDefault();
  const name = (document.getElementById("city-name") as HTMLInputElement).value;
  const country = (document.getElementById("city-country") as HTMLInputElement)
    .value;
  const nameAc = (document.getElementById("aloj-name") as HTMLInputElement).value;
  const costAc = (document.getElementById("aloj-cost") as HTMLInputElement)
    .value;
  const dateFrom = (
    document.getElementById("city-date-from") as HTMLInputElement
  ).value;
  const dateTo = (document.getElementById("city-date-to") as HTMLInputElement)
    .value;
  const notes = (document.getElementById("city-notes") as HTMLTextAreaElement)
    .value;

  const city = new City(
    name,
    country,
    new Date(dateFrom),
    new Date(dateTo),
    notes,
    new Accommodation(nameAc,costAc),
  );
  if (!city) {
    showToast("Error", "No se pudo crear la ciudad", "danger");
    return;
  }
  if (!saveCity(city)) return;
  showToast("Éxito", "Ciudad agregada", "success");
  renderCities();
  form?.reset();
  setDefaultDates();
}

function getTodayIso(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function setDefaultDates(): void {
  const today = getTodayIso();
  const from = document.getElementById(
    "city-date-from",
  ) as HTMLInputElement | null;
  const to = document.getElementById(
    "city-date-to",
  ) as HTMLInputElement | null;
  if (from && !from.value) from.value = today;
  if (to && !to.value) to.value = today;
}

function saveCity(city: City): boolean {
  try {
    manager.addCity(city);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    showToast("Error", message || "No se pudo agregar la ciudad", "danger");
    return false;
  }
}

function formatDateIso(d: string | Date): string {
  if (!d) return "";
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
    const [year, month, day] = d.split("-");
    return `${day}/${month}/${year}`;
  }
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString("es-ES");
  } catch {
    return String(d);
  }
}

function showToast(
  title: string,
  message: string,
  variant = "primary",
): void {
  const container = document.getElementById("alert-container");
  if (!container) return;

  const variantClass = `alert-${variant}`;
  const wrapper = document.createElement("div");
  wrapper.className = `alert ${variantClass} alert-dismissible fade show`;
  wrapper.setAttribute("role", "alert");
  wrapper.innerHTML = `<strong>${title || "Aviso"}</strong> ${String(message || "")} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  container.appendChild(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 3000);
}

setDefaultDates();
renderCities();
