import { parse } from 'date-fns';
import type { Horario } from './tipos';

export function horario_proximo(horarios: Horario[], ref: Date): Horario | undefined {
	if (horarios.length < 2) {
		return horarios.at(0);
	}
	return horarios.find(({ hora }) => parse(hora, 'HH:mm', ref) >= ref) || horarios.at(0);
}

export function horario_anterior(horarios: Horario[], ref: Date): Horario | undefined {
	if (horarios.length < 2) {
		return horarios.at(0);
	}
	return horarios.findLast(({ hora }) => parse(hora, 'HH:mm', ref) < ref) || horarios.at(-1);
}
