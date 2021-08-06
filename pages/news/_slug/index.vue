<template>
  <div class="flex justify-center w-full">
    <div class="max-w-3xl">
      <div class="text-5xl mt-32 font-bold">
        {{ title }}
      </div>
      <div class="my-4 text-lg">
        {{ sub }}
      </div>
      <a
        class="flex items-center no-underline hover:underline text-black"
        href="#"
      >
        <img
          alt="Profile picture"
          class="block rounded-full"
          src="https://picsum.photos/32/32/?random"
        />
        <div class="flex flex-col">
          <span class="ml-2 text-sm font-semibold"> Robert Vranješ </span>
          <span class="ml-2 text-sm"> Jul 17 2021 </span>
        </div>
      </a>
      <div class="my-4">
        <img
          alt="Main article picture"
          class="flex w-full"
          src="https://picsum.photos/32/32/?random"
        />
      </div>
      <div v-html="description" class="mt-8 mb-48 text-lg"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Healthier together u sklopu škole',
      sub: 'Razvoj Erasmus projekata na području Osječko-baranjske županije.',
      description:
        'Osijek Fencing Camp je ideja nastala iz potrebe za otporom prema inerciji koju nam je donio COVID 19 te kao logičan odgovor nas iz borilačke branše.  <br> \n' +
        'Kao što je poznato 5. Kup grada Osijeka (5th Osijek Fencing Cup) i Europski kup EFC U14 u disciplini mač koji je bio predviđen za 28/29. ožujka 2020 u Osijeku  nije održan zbog situacije s COVID-19.  <br> \n' +
        'Inače, na tom kupu bilo je nominirano i potvrđeno oko 15 zemalja sudionica sa do 400 sportskih nastupa u svim kategorijama i EFC kupom U14.  <br> \n' +
        'Osijek Fencing Camp 2020 (engl. naziv je s ciljem da u budućnosti bude internacionalni s asocijacijom na naše već poznato natjecanje) održati ćemo za sve hrvatske natjecatelje koji imaju rezultate na rang listi te za sve pripadnike Osječkog mačevalačkog kluba (po pravu domaćina). <br> \n' +
        'Organizaciju ovog kampa radimo sa Mačevalačkim savezom Zagreba koji daje stručno trenersko vodstvo te sa Hrvatskim mačevalačkim savezom koji daje logističku potporu i nacionalnu trenericu za razvoj koja je sufinancirana putem HOO). <br> \n' +
        'Na kamp dolazi 20 tak mačevalaca iz hrvatskih klubova Zagreba, Poreča, te gotovo svi članovi osječkog kluba njih 35…  ali dajemo i početnu međunarodnu  notu – stižu i  2 slovenska natjecatelja. Mnogi od prijavljenih natjecatelja su hrvatski reprezentativci u kategorijama U17 i U20 te seniori i veterani. <br> \n' +
        'Mjesto događanja Kampa je Dvorana Gradski vrt – Atletska dvorana sa preko 1000 kvadratnih metara prostora.  <br> \n' +
        'Vrijeme: 23. 8. do 30. 8. 2020 kao cjelodnevne aktivnosti s prekidima za ručak. <br>  \n' +
        'U nedjelju 23.8. ćemo prijepodne imati uvodni kondicijski trening za Osječane a popodne (zbog smještaja ostalih)  počinje prvi zajednički uvodni trening. <br> \n' +
        'Nadalje ćemo svakodnevno biti u dvorani od 8.30 do navečer sukladno Planu i programu stručnog tima. <br> \n' +
        'Subota,  29.8. u popodnevnim satima do navečer imati ćemo mačevalački maraton u kojemu će se po posebnim načinima bodovanja moći pokazati svi sudionici kampa gdje ćemo svima dati majicu kampa i po neku uspomenu a najboljima podijeliti nagrade sponzora. <br> \n' +
        'Osijek trenutno ima jednog A reprezentativca U17 ( Ivan Mikodanić),  dvije B reprezentativke (Iva Budžaki i Mare Jukić) U17, te jednu U20. (Helena Lušić). <br> \n' +
        'Dva nacionalna trenera, 4 nacionalna suca za mač od kojih je jedan EFC sudac i 35 registriranih natjecatelja u Hrvatskom mačevalačkom savezu za nacionalnu Rang listu. <br> \n' +
        'Što se tiče prijavljenih hrvatskih reprezentativaca u disciplini mač…za sada imamo prijave  sljedećih : Ana Mesić, Vedran Markota, Iva Banović, Lucija Gnjidić, Jakov Pleše (postoji još rezervni rok kamp je otvoren za sve HR mačevatelje do zadnjeg dana). <br> \n' +
        '  <br> \n' +
        'Nastojali smo kao i uvijek do sada biti dobri domaćini i odlični organizatori, unatoč COVID u bit ćemo i sada. <br> \n' +
        'Kako bi sve prošlo kako treba brinuti će vodstvo kampa: <br> \n' +
        'Odgovorna osoba kampa Branko Lozančić Predsjednik i trener kluba Osijek <br> \n' +
        'Službeni voditelj kampa ispred HMS i MSZ Trenerica za razvoj Martina Zmaić, Zagreb <br> \n' +
        'Nacionalni trener  za mač Filip Vuković – Mačevalački savez Zagreba <br> \n' +
        'Nacionalni trener za floret Marin Fabijanić  Mačevalački savez Zagreba <br> \n' +
        'Službeni liječnik kampa: dr. Nikola Kraljik spec. epidemiolog ZZJ Osijek <br> \n' +
        'Tehnika i elektronika: Tomislav Lušić  i Igor Radošević (ujedno sudac za mač CRO B) oba Osijek <br> \n' +
        'Od osječkih trenera trenerski pripravnik Zdenko Kurtović (natjecatelj senior, nacionalni sudac B i EFC sudac) <br> \n' +
        'Moguć je dolazak trenerice Smiljke Rodić iz Mačevalačkog saveza Srbije o čemu još nemamo potvrdu. <br> \n' +
        'Zahvaljujemo se sponzorima i donatorima koji su nam se preko neodržanog Kupa grada Osijeka do organizacije ovoga kampa pridružili i pomogli da preživimo te nastavimo izvrsnost svoga djelovanja.',
      author: 'Predrag Perić',
    }
  },
}
</script>

<style></style>
