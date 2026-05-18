import { parse } from 'date-fns';
import { DIAS, type Dias, type Horario } from './tipos';

export async function carregarLingaguem(codigo: string | null) {
	try {
		return await import(`./idiomas/${codigo ?? 'pt'}.json`);
	} catch {
		return await import(`./idiomas/pt.json`);
	}
}

export const CODIGO_DIAS = new Map([
	[DIAS.uteis, 'util'],
	[DIAS.sabado, 'sab'],
	[DIAS.domingoFeriados, 'dom'],
	[DIAS.domingoFeriados | DIAS.sabado, 'findes'],
	[127, 'todos']
]);

export function codigoPraDia(d: Dias): string {}

export function horaPraNum(hora: string): number {
	return Number(hora.replace(/\D/g, ''));
}

export function ordenarHorarios(horarios: Horario[]): Horario[] {
	return horarios.sort(({ hora: a }, { hora: b }) => horaPraNum(a) - horaPraNum(b));
}

export function horarioProximo(horarios: Horario[]): Horario | undefined {
	if (!horarios) return undefined;
	if (horarios.length < 2) return horarios.at(0);

	const agora = new Date();
	const agoraNum = agora.getHours() * 100 + agora.getMinutes();
	return horarios.find(({ hora }) => horaPraNum(hora) >= agoraNum) || horarios.at(0);
}

export function horario_proximo(horarios: Horario[], ref: Date): Horario | undefined {
	if (!horarios) return undefined;
	if (horarios.length < 2) {
		return horarios.at(0);
	}
	return horarios.find(({ hora }) => parse(hora, 'HH:mm', ref) >= ref) || horarios.at(0);
}

export function horario_anterior(horarios: Horario[], ref: Date): Horario | undefined {
	if (!horarios) return undefined;
	if (horarios.length < 2) {
		return horarios.at(0);
	}
	return horarios.findLast(({ hora }) => parse(hora, 'HH:mm', ref) < ref) || horarios.at(-1);
}
