import French from "./fr-FR.json";
import English from "./en-US.json";
import { createContext } from "react";
import {MessageFormatElement} from "react-intl";

export const languages = {
  fr: {
    locale: "fr",
    messages: French
  },
  en: {
    locale: "en",
    messages: English
  }
};
  
export const LanguageContext = createContext();

//export default LanguageContext;
  