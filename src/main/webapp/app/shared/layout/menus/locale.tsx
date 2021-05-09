import React from 'react';
import { locales, languages } from 'app/config/translation';
import { PanelMenu } from 'primereact/panelmenu';
import { prependOnceListener } from 'process';


export const LocaleMenu = ({ currentLocale, onClick, onHide }: {onHide : Function, currentLocale : string, onClick: Function}) => {

  const onChangeLang = (lang : string) => {
    onHide();
    onClick(lang);
  }

  return Object.keys(languages).length > 1 ? (
    <PanelMenu model={[
      {
        label: currentLocale ? languages[currentLocale].name : undefined,
        items: [
          {
            label: languages["fr"].name,
            icon: "pi pi-fw pi-globe",
            command: () => onChangeLang("fr")
          },
          {
            label: languages["en"].name,
            icon: "pi pi-fw pi-globe",
            command: () => onChangeLang("en")
          }
        ],
      }
    ]} />
  ) : null};