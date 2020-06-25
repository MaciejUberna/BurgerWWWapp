import React from 'react';
import classes from './terms-of-use.module.css';

export const terms = (
    <div className={classes.Terms}>
        <h2 className={classes.MainTitle}> Regulamin korzystania z Dema Serwisu </h2>
        <h3 className={classes.SubTitle}> Postanowienia ogólne </h3>
        <ol className={classes.DealText}>
            <li>Niniejszy Regulamin określa zasady funkcjonowania oraz warunki korzystania z dema serwisu "maciej-my-burger.web.app", 
                zwanego dalej Demo Serwisem. Regulamin definiuje prawa i obowiązki korzystających z niego Użytkowników oraz administratora 
                Serwisu w zakresie świadczenia usług drogą elektroniczną.</li>
            <li>Użytkownik: każda osoba, która odwiedza witryny skupione w ramach Serwisu.</li>
            <li>Serwis: oznacza witrynę internetową znajdującą się pod adresem "maciej-my-burger.web.app" wraz ze wszelkimi jej podstronami.</li>
            <li>Administrator zastrzega sobie prawo do ograniczenia dostępu do niektórych treści lub funkcji serwisu wedle przyjętych przez 
                siebie kryteriów, w szczególności uzależnienia ich od zarejestrowania konta, uiszczenia opłaty i innych wskazanych przez siebie 
                okoliczności.
            </li>
            <li>Wszystkie dane przechowywane w Demie Serwisu mogą być co określony okres czasu usuwane.</li>
            <li>Serwis symuluje świadczenie usługi drogą internetową</li>
        </ol>
    </div>
);