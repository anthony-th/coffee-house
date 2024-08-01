import { createElement } from "../common/createElement";
import { heroSection } from "./hero";
import { favoriteSection } from "./favorite";
import { aboutSection } from "./about";
import { mobileSection } from "./mobileapp";

export const main = createElement('main', ['main']);

main.append(heroSection, favoriteSection, aboutSection, mobileSection);