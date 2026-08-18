import { environment } from "src/environments/environment";

/** Rasmi yo'q yozuvlar uchun standart surat (tashqi saytlarga bog'liq bo'lmasin) */
export const RASM_YOQ = 'assets/img/rasm-yoq.svg';

/**
 * Backenddan kelgan fayl obyektini yuklab olish manziliga o'giradi.
 * Fayl bo'lmasa standart suratni qaytaradi.
 */
export function rasmManzili(file: any): string {
    if (file && file.id) {
        return environment.baseApi + "/api/file/download/" + file.id;
    }
    return RASM_YOQ;
}
