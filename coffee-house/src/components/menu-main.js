import { createElement } from "../common/createElement";
import { menuSection } from "./menu";

export const menuMain = createElement('main', ['main']);

menuMain.append(menuSection);