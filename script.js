async function loadPkm(pokemon) {
  const url = `https://tyradex.vercel.app/api/v1/pokemon/${pokemon}`;
  const data = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return data;
}

const pokemons = [
  {
    types: [],
    stats: {},
    resistances: [],
  },
  {
    types: [],
    stats: {},
    resistances: [],
  },
];

let choice;

["pkm1", "pkm2"].forEach((id) => {
  document.getElementById(id).addEventListener("change", async function () {
    const pkmName = this.value.replaceAll("é", "e").replaceAll("è", "e");
    if (!pkmName) return;

    document.getElementById(`${id}types`).innerHTML = "";
    document.getElementById(`${id}img`).innerHTML = "";
    document.getElementById(`${id}img`).style.filter = "grayscale(0)";
    document.getElementById("start").disabled = false;

    const pkmData = await loadPkm(pkmName);

    if (!pkmData.pokedex_id) {
      document.getElementById(`${id}img`).src = "assets/no-sign.png";
      return;
    }

    pkmData.types.forEach((type) => {
      let typeImg = document.createElement("img");
      typeImg.setAttribute("height", "32");
      typeImg.setAttribute("width", "32");
      typeImg.src = type.image;
      typeImg.alt = type.name;

      document.getElementById(`${id}types`).appendChild(typeImg);
    });

    document.getElementById(`${id}img`).src = pkmData.sprites.regular;

    let hp = (pkmData.stats.hp * 100) / pkmData.stats.hp; // = 100
    document.getElementById(`${id}pv`).style.width = `${hp}%`;
    document.getElementById(`${id}pv`).innerText = pkmData.stats.hp;

    document.getElementById(`${id}atk`).innerText = Math.floor(
      pkmData.stats.atk / 10
    );
    document.getElementById(`${id}def`).innerText = Math.floor(
      pkmData.stats.def / 10
    );
    document.getElementById(`${id}atkspe`).innerText = Math.floor(
      pkmData.stats.spe_atk / 10
    );
    document.getElementById(`${id}defspe`).innerText = Math.floor(
      pkmData.stats.spe_def / 10
    );
    document.getElementById(`${id}vit`).innerText = Math.floor(
      pkmData.stats.vit / 10
    );

    if (id === "pkm1") {
      pokemons[0] = {
        types: pkmData.types,
        stats: pkmData.stats,
        resistances: pkmData.resistances,
      };
    } else {
      pokemons[1] = {
        types: pkmData.types,
        stats: pkmData.stats,
        resistances: pkmData.resistances,
      };
    }

    if (pokemons[0].stats.vit >= pokemons[1].stats.vit) choice = 1;
    else choice = 0;
  });
});

function fight() {
  document.getElementById("start").disabled = true;
  document.getElementById("pkm1").disabled = true;
  document.getElementById("pkm2").disabled = true;
  choice++;

  if (choice === 2) {
    choice = 0;
  }

  let pkm1hp = document.getElementById("pkm1pv").textContent;
  let pkm1atk = document.getElementById("pkm1atk").textContent;

  let pkm2hp = document.getElementById("pkm2pv").textContent;
  let pkm2atk = document.getElementById("pkm2atk").textContent;

  if (choice === 0) {
    const pvBar = document.getElementById("pkm2pv");
    let pkm1atkModifier = pkm1atk;

    pokemons[1].resistances.forEach((r) => {
      pokemons[0].types.forEach((t) => {
        if (t.name === r.name) {
          pkm1atkModifier = pkm1atkModifier * r.multiplier;
        }
      });
    });

    pkm2hp -= pkm1atkModifier;

    pvBar.innerText = pkm2hp;
    pvBar.style.width = `${(pkm2hp * 100) / pokemons[1].stats.hp}%`;

    if (pvBar.textContent <= 0) {
      pvBar.innerText = 0;
      pvBar.style.width = "0%";
      document.getElementById("pkm2img").style.filter = "grayscale(1)";
      document.getElementById("pkm1").disabled = false;
      document.getElementById("pkm2").disabled = false;
      return;
    }
  } else {
    const pvBar = document.getElementById("pkm1pv");
    let pkm2atkModifier = pkm2atk;

    pokemons[0].resistances.forEach((r) => {
      pokemons[1].types.forEach((t) => {
        if (t.name === r.name) {
          pkm2atkModifier = pkm2atkModifier * r.multiplier;
        }
      });
    });

    pkm1hp -= pkm2atkModifier;

    pvBar.innerText = pkm1hp;
    pvBar.style.width = `${(pkm1hp * 100) / pokemons[0].stats.hp}%`;

    if (pvBar.textContent <= 0) {
      pvBar.innerText = 0;
      pvBar.style.width = "0%";
      document.getElementById("pkm1img").style.filter = "grayscale(1)";
      document.getElementById("pkm1").disabled = false;
      document.getElementById("pkm2").disabled = false;
      return;
    }
  }
  setTimeout(() => {
    fight();
  }, 750);
}

document.getElementById("start").addEventListener("click", () => {
  fight();
});
