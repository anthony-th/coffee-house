import { createElement } from "./common/createElement";
import { menuSection } from "./menu";

const menuMain = createElement('main', ['main']);

menuMain.append(menuSection);

export { menuMain };
