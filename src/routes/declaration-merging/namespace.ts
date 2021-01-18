export namespace C {
	const yd = 'yd';
	export class YD {}
	export function getName() {
		return yd;
	}
}

export namespace C {
	export const jw = 'jw';
	export class JW {}
	export function getYdName() {
		// return yd;
		return jw;
	}
}

class Album {
	label: Album.AlbumLabel = new Album.AlbumLabel();
}

namespace Album {
	export class AlbumLabel {}
}

console.info('????');
// console.info(Album.test());
console.info(new Album().label);
console.info('!!!!');

function buildLabel(name: string): string {
	return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
	export let suffix = "";
	export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));

enum Color {
	red = 1,
	green = 2,
	blue = 4,
}

namespace Color {
	export function mixColor(colorName: string) {
		if (colorName == "yellow") {
			return Color.red + Color.green;
		} else if (colorName == "white") {
			return Color.red + Color.green + Color.blue;
		} else if (colorName == "magenta") {
			return Color.red + Color.blue;
		} else if (colorName == "cyan") {
			return Color.green + Color.blue;
		}
	}
}

console.info(Color.mixColor('yellow'));