function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
var locations = ["Aipur",
    "Aitipamula",
    "Akkinepally",
    "Alwal",
    "Ambala",
    "Ammanabole",
    "Anajipur",
    "Anantharam",
    "Anatharam",
    "Anjajipur",
    "Annerparthy",
    "Anthampet",
    "Anumula",
    "Arroor",
    "Athmakur",
    "Azmapur",
    "Banda Timmapur",
    "Baswapur",
    "Begumpeta",
    "Bijilapuram",
    "Bodduguda",
    "Bogguladone",
    "Bollanpally",
    "Bollepally",
    "Bondugula",
    "Bottuguda",
    "Brahmana Vellemla",
    "Chada",
    "Chalakuthy",
    "Challur",
    "Chamalapally",
    "Chamdampet",
    "Chandanapally",
    "Chandepally",
    "Chandupatla",
    "Chelmada",
    "Chepur So",
    "Cherla Gouraram",
    "Cherughat",
    "Cherukupally",
    "Chervuannaram",
    "Chetlachennaram",
    "Chikatimamidi",
    "Chilakamarry",
    "Chillapur",
    "Chinakondur",
    "Chinnamadharam",
    "Chinthalapalem",
    "Chinthapalli",
    "Chirragudur",
    "Chitriyala",
    "Chittapur",
    "Chityala",
    "Cholla Ramaram",
    "Choutupala",
    "Clock Tower (nalgonda)",
    "Dacharam",
    "Damera",
    "Damera Bheemanapally",
    "Dattappagudem",
    "Devalammanagaram",
    "Devathpally",
    "Dharmaram",
    "Dindi Project",
    "Domalapally",
    "Dorepally",
    "Dugenevally",
    "Duppally",
    "Edullaguda",
    "Eduloor",
    "G. Aeroli",
    "Gadia Gowraram",
    "Gagillapur",
    "Gandhamalla",
    "Gandhinagar (nalgonda)",
    "Gatlamallepally",
    "Gattusingaram",
    "Ghanpur",
    "Gokaram",
    "Golankonda",
    "Gonaboinpally",
    "Govindapuram",
    "Gowraipally",
    "Gudimalkapur",
    "Gudipalli",
    "Gudur",
    "Gujja",
    "Gummadavally",
    "Gundala",
    "Gundrampally",
    "Gurrampode",
    "Hajipur",
    "Ibrahimpet",
    "Indloor",
    "Indriyala",
    "Indurthy",
    "Injamoor",
    "Jaikesaram",
    "Jalapur",
    "Jangaon",
    "Jangareddy Gudem",
    "Jiblakpally",
    "Julur",
    "Junuthala",
    "Kacharajupally",
    "Kambalapally",
    "Kamepally",
    "Kanchariapally",
    "Kandukur",
    "Kaparthy Khurd",
    "Kapraipally",
    "Katepally",
    "Kattangur",
    "Khanapur",
    "Kistapur",
    "Kolanpaka",
    "Kollur",
    "Kompally",
    "Kondagadapa",
    "Kondamadugu",
    "Koppole",
    "Koratikal",
    "Kotamarthy",
    "Kothapally",
    "Kudabakashpally",
    "Kunur",
    "Kurella",
    "Kurmapally",
    "Kurmedu",
    "Kurumarthy",
    "Lenkalapally",
    "Lingojigudem",
    "Mada Yadavalli",
    "Madanapur",
    "Madgulapally",
    "Madhapur",
    "Malkapuram",
    "Mallareddypally",
    "Mamidyala",
    "Mandra",
    "Manyamchelka",
    "Marepally",
    "Marriguda",
    "Marripadaga",
    "Maryal",
    "Masampally",
    "Medaram",
    "Medipally",
    "Medlavai",
    "Merada",
    "Mosangi",
    "Mududandla",
    "Munukuntla",
    "Muripirala",
    "Mushampally",
    "Musipatla",
    "Mustipally",
    "Nadikuda",
    "Naginenipally",
    "Nakrekal",
    "Nalgonda",
    "Namila",
    "Nampalli",
    "Narketpalli",
    "Narsinghbhatla",
    "Nasarlapally",
    "Nellikal",
    "Nemmani",
    "Neredugum",
    "Nyalapatla",
    "Oldabadi",
    "Ookondi",
    "Pagidimarry",
    "Pahilwanpur",
    "Pajjur",
    "Paladugu",
    "Palivela",
    "Pallepahad",
    "Pallepahada",
    "Pallerla",
    "Pallivada",
    "Palvai",
    "Pamukunta",
    "Pangal",
    "Panthangi",
    "Parada",
    "Parupally",
    "Parvedula",
    "Pasnoor",
    "Patimatla",
    "Peda Adisarlapally",
    "Pedakaparthy",
    "Pedavoora",
    "Peddamunigal",
    "Peddapuram",
    "Perepally",
    "Perur",
    "Pervail",
    "Pillaipally",
    "Pochamppaly",
    "Podichedu",
    "Pogilla",
    "Polepally",
    "Polepally Ramnagar",
    "Pothunur",
    "Powerhouse Hostel",
    "Pulicherla",
    "Puligilla",
    "Pulipalupula",
    "Pullemla",
    "Puttapaka",
    "Rahgavapur",
    "Rahimkhanpeta",
    "Rahmanthapur",
    "Raigiri",
    "Rajapeta",
    "Rajavaram",
    "Rajupeta",
    "Ramagiri",
    "Ramalingampally",
    "Redlarepaka",
    "Repakapatti",
    "Rustapur",
    "Sangam",
    "Sarvaram",
    "Sarvepally",
    "Seetharampur",
    "Shah Ghajipur",
    "Shapally",
    "Sharjipet",
    "Shobanadripuram",
    "Sirisanagandla",
    "Sivaneniguda",
    "Slbc",
    "Somaram",
    "Suddala",
    "Sultanpur",
    "Sunkenapally",
    "Survail",
    "Swamivari Lingotam",
    "Takkallapally",
    "Talla Vellemla",
    "Tangedapally",
    "Tangutoor",
    "Teldevarapally",
    "Tenepally",
    "Teppalamadugu",
    "Teppelaneni Gouraram",
    "Thanedarpally",
    "Theratpally",
    "Theriala",
    "Thipparthi",
    "Timmapur",
    "Tippalaneni Gouraram",
    "Tirugandlapally",
    "Tirumalagiri",
    "Tondalvai",
    "Towklapur",
    "Tummalaguda",
    "Tummlapally",
    "Tungathurthy",
    "Turkalshapuram",
    "Urumadla",
    "Utlapally",
    "Vaddepally",
    "Vaddipatla",
    "Vailapally",
    "Vanipakala",
    "Vankamamidi",
    "Vasalmarry",
    "Vattikode",
    "Vattimarthy",
    "Vattiparthy",
    "Vavikole",
    "Veeraboinapally",
    "Veerareddypally",
    "Veeravally",
    "Velamjala",
    "Veldevi",
    "Veliminedu",
    "Velmaguda",
    "Velmakanne",
    "Venkampeta",
    "Venkatpur",
    "Vijayapuri North",
    "Yacharam",
    "Yelikatta",
    "Yellareddyguda",
    "Yeragandlapally",
    "Yerraram",
    "Balanagar",
    "Farooqnagar",
    "Ghatkesar",
    "Hayathnagar",
    "Hyd",
    "Ibrahimpatnam",
    "Kandukur",
    "Maheswaram",
    "Medchal",
    "Moinabad",
    "Nawabpet",
    "Qutubullapur",
    "R",
    "Rajendra Nagar",
    "Rajendranagar",
    "Rangareddy",
    "Rr.",
    "Saroornagar",
    "Seri Lingampally",
    "Serilingampally",
    "Shabad",
    "Shahabad",
    "Shameerpet",
    "Shamirpet",
    "Shamshabad",
    "Shankarpally",
    "Tandur",
    "Uppal",
    "Vikarabad",
    "Bharat Nagar Colony",
    "Fathenagar Colony",
    "Moosapet",
    "Swarajyanagar",
    "Sardarnagar",
    "Edulabad",
    "Venkatadri",
    "Hayatnagar",
    "Mansoorabad",
    "Ragannaguda X Roads",
    "Ramoji Film City",
    "Sanghinagar",
    "Seriguda",
    "Mucharla",
    "Dubbacherla",
    "Kalwakole",
    "Kongaraviryla",
    "Aziz Nagar",
    "Himayathnagar",
    "Arkatala",
    "Bachupally",
    "Gandipet",
    "Kokapet",
    "Mancherevula",
    "Wattinagulapalli",
    "Adibatla",
    "Adikcherla",
    "Agapalli",
    "Agnoor",
    "Ainapur",
    "Akulamailaram",
    "Allapur",
    "Alur",
    "Amdapur",
    "Amradikalan",
    "Bennur",
    "Balapur",
    "Chaithanyapuri Colony",
    "Dilsukhnagar Colony",
    "Huda Residential Complex",
    "Jillellaguda",
    "Karmanghat",
    "Pahadishareef",
    "Ramakrishanapuram",
    "Rangareddy Dt Courts",
    "Gachibowli",
    "Kondapur",
    "Lingampalli",
    "Mathrusri Nagar",
    "Regadi Doswada",
    "Amberpet",
    "Ameerpet",
    "Asifnagar",
    "Bahadurpura",
    "Bandlaguda",
    "Charminar",
    "Golconda",
    "Hyderabad",
    "Khairatabad",
    "Malkagiri Manda",
    "Musheerabad",
    "Nampally",
    "Quthbullapur Mandal",
    "Saidabad",
    "Shaikpet",
    "Shamirpet Mandal",
    "Tirumalagiri",
    "Hyderabad Public School",
    "Malakpet Colony",
    "Seminary",
    "Srinivasapuram (hyderabad)",
    "Sripuram Colony",
    "Zindatelismath",
    "Erragadda",
    "Sanath Nagar Colony",
    "Sanjeev Reddy Nagar",
    "Humayunnagar",
    "Karwan Sahu",
    "Kulsumpura",
    "Mangalhat",
    "Murad Nagar (hyderabad)",
    "Shantinagar (hyderabad)",
    "Vijay Nagar Colony (hyderabad)",
    "Hussainialam",
    "Kishanbagh",
    "Tadbun",
    "Sanathnagar I E",
    "Vivekananda Nagar Colony",
    "Vivekanandanagar Colony",
    "Darushifa",
    "Falaknuma",
    "Fatehdarwaza",
    "High Court (hyderabad)",
    "Hyderabad Jubilee",
    "Moghalpura",
    "Shahalibanda",
    "Uppuguda",
    "Yakutpura",
    "Boduppal",
    "Medipalli",
    "Dargah Hussain Shahwali",
    "Hyder Shah Kote",
    "Hydershahkote",
    "Ibrahim Bagh Lines",
    "Kakatiya Nagar",
    "Lunger House",
    "Nanakramguda",
    "Sakkubai Nagar",
    "Toli Chowki",
    "Vanastalipuram",
    "Barkatpura",
    "Gagan Mahal",
    "Lic Division",
    "Narayanguda",
    "New Mla Quarters",
    "Parishram Bhawan",
    "Ramakrishna Mutt",
    "Stn Kachiguda",
    "Aliabad",
    "Ankireddipalli",
    "Ankushapur",
    "Bogaram",
    "Cherial",
    "Cherlapalli",
    "Dabirpur",
    "Gajularamaram",
    "Girmapur",
    "Gowdavalli",
    "Keesara",
    "Keesaragutta",
    "Kolthur",
    "Korremal",
    "Kutbullapur",
    "Kyasaram",
    "Lalgadi Malakpet",
    "Mudchintanapalli",
    "Nutankal",
    "Pragatinagar",
    "Pratapsingaram",
    "Rajbolaram",
    "Rampallidiara",
    "Ravalkol",
    "Rompalli",
    "Thimmaipalli",
    "Thumkunta",
    "Turkapalliyadaram",
    "Vikarabad",
    "Yadgarpalli",
    "Badangpet",
    "Hyderabad G.p.o.",
    "Kismathpur",
    "L B Nagar",
    "Mamidipalli",
    "Musheerabad (delivery)",
    "Peerzadiguda",
    "Saidabad (hyderabad)",
    "Secunderabad",
    "A.gs Office",
    "A.gs. Staff Quarters",
    "Anandnagar (hyderabad)",
    "Banjara Hills",
    "Bazarghat (hyderabad)",
    "Central Secretariat",
    "I.m.colony",
    "Raj Bhawan (hyderabad)",
    "Srinagar Colony",
    "Vengal Rao Nagar",
    "Yousufguda",
    "Kowkoor",
    "Ambernagar",
    "Andhra Mahila Sabha",
    "Ashoknagar (hyderabad)",
    "Golconda Chowrastha",
    "Musheerabad (nd)",
    "Nallakunta",
    "New Nallakunta",
    "Vidyanagar (hyderabad)",
    "Zamistanpur",
    "Begumbazar",
    "Gandhi Bhawan (hyderabad)",
    "Moazzampura",
    "Nimboliadda",
    "Putlibowli",
    "Seetharampet",
    "Somajiguda",
    "State Bank Of Hyderabad",
    "State Bank Of India",
    "Vidhan Sabha (hyderabad)",
    "Komplly",
    "Nizampet",
    "C.b.i.t",
    "Don Bosco Nagar",
    "Hyderguda",
    "Kattedan Ie",
    "Rajendranagar (k.v.rangareddy)",
    "Malkajgiri",
    "Trimulgherry",
    "Balanagar Township",
    "Old Malakpet",
    "Osmannagar (hyderabad)",
    "Sahifa",
    "Saidabad Colony",
    "Santoshnagar Colony",
    "Gayatri Nagar",
    "Meerpet",
    "P & T Colony (k.v.rangareddy)",
    "Vaishalinagar",
    "Administrative Buildings",
    "Aphb Colony Moulali",
    "Begumpet Policelines",
    "Begumpet",
    "Dr As Rao Nagar",
    "Ecil",
    "Gandhinagar (hyderabad)",
    "Himmatnagar",
    "Ie Moulali",
    "Iict",
    "Jai Jawan Colony",
    "Jama I Osmania",
    "Katchavanisingaram",
    "Kingsway",
    "Kushaiguda",
    "Lallaguda",
    "Lallapet",
    "Mg Road",
    "Moulali",
    "Nehrunagar (hyderabad)",
    "Ngri",
    "Padmaraonagar",
    "Picket",
    "Prakashamnagar",
    "Rail Nilayam",
    "Rajeevagruhakalpa",
    "Samskruthi",
    "Sitaphalmandi",
    "Tarnaka",
    "Manuu",
    "Cyberabad",
    "Dr.b R Ambedkar O.u",
    "Film Nagar",
    "Jubilee Hills",
    "Madhapur",
    "Airforce Academy",
    "Alwal",
    "Anandbagh",
    "Anantaram",
    "Aoc Records",
    "Bahadurpalli",
    "Bits",
    "Bolarum Bazar",
    "Bolarum",
    "Bowenpally",
    "Chandanagar",
    "Cie Balangar",
    "Crpf",
    "Eme Records",
    "Haiglines",
    "Hakimpet",
    "Hal (hyderabad)",
    "Hanumanpet",
    "Hmt Township",
    "Ida Jeedimetla",
    "Jaggamguda",
    "Jawahar Nagar",
    "Jj Nagar Colony",
    "Jntu Kukat Pally",
    "Kphb Colony",
    "Kukatpally",
    "Manovikasnagar",
    "Miyapur",
    "Neredmet",
    "Nisa Hakimpet",
    "Peddalaxmapur",
    "Ramakrishna Puram",
    "Rangareddynagar",
    "Sainikpuri",
    "Suraram",
    "Vikasnagar (hyderabad)",
    "I.e.nacharam",
    "Allampalli "

];

/*initiate the autocomplete function on the "myInput" element, and pass along the locations array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), locations);