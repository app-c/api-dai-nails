/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function convertHours(time: string) {
   const [hour, minutes] = time.split(":").map(Number);
   const timeInMinutes = hour * 60 + minutes;
   return timeInMinutes;
}

export function converData(data: string) {
   const [ano, mes, dia, hora, min] = data.split("/").map(Number);
   const horaMin = hora * 60;
   const totalMin = ano + mes + dia + horaMin + min;
   return totalMin;
}
