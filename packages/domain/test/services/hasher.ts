import {
	HashComparer,
	HashGenerator,
} from "@src/domain/lists/application/services";

export class Hasher implements HashGenerator, HashComparer {
	async hash(plain: string): Promise<string> {
		return `${plain}-hash`;
	}

	async compare(plain: string, hash: string): Promise<boolean> {
		return `${plain}-hash` === hash;
	}
}
