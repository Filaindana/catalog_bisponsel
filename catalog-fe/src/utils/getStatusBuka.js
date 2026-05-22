export function getStatusBuka(jamOperasional) {
  const now = new Date();
  const day = now.getDay();
  const hourDecimal = now.getHours() + now.getMinutes() / 60;
  const weekdayIndex = day === 0 ? 6 : day - 1;

  if (!jamOperasional || !jamOperasional.pusat) {
    return { buka: false, label: "Jam operasional belum disetel" };
  }

  const pusat = jamOperasional.pusat;
  const activeRange = weekdayIndex < 5 ? pusat.senin_jumat : pusat.sabtu;

  if (!activeRange || activeRange.libur) {
    return { buka: false, label: "Libur Hari Ini" };
  }

  const [openHour, openMinute] = (activeRange.buka || "00:00").split(":").map(Number);
  const [closeHour, closeMinute] = (activeRange.tutup || "00:00").split(":").map(Number);

  const openTime = openHour + openMinute / 60;
  const closeTime = closeHour + closeMinute / 60;

  if (hourDecimal >= openTime && hourDecimal < closeTime) {
    return {
      buka: true,
      label: `Sedang Buka · Tutup ${activeRange.tutup?.replace(":", ".")} WIB`,
    };
  }

  return {
    buka: false,
    label: `Tutup · Buka ${activeRange.buka?.replace(":", ".")} WIB`,
  };
}
