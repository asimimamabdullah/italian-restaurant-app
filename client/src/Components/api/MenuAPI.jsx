import { useState } from "react";

const MenuAPI = () => {
  const [menu] = useState([
    {
      category: "antipasti",
      image:
        "https://images.pexels.com/photos/3637608/pexels-photo-3637608.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "aloo samosa",
          whisper: "verdure varie, farina tipo, spezie",
          price: 5,
        },
        {
          name: "chicken samosa",
          whisper: "dadini di pollo, prezzemolo indiano, farina di ceci",
          price: 4,
        },
        {
          name: "chicken pakora",
          whisper: "dadini di pollo, farina di ceci, spezie",
          price: 5,
        },
        {
          name: "falafel",
          whisper: "polpette di ceci",
          price: 5,
        },
        {
          name: "fish finger",
          whisper: "fritto di pesce",
          price: 6,
        },
        {
          name: "raita",
          whisper: "yogurt con pomodori e cetrioli",
          price: 4,
        },
        {
          name: "kachoomar salad",
          whisper: "insalata mista, cipolle, pomodori e cetrioli",
          price: 4,
        },
        {
          name: "russian salad",
          whisper: "insalata mista, ananas, mele, uva secca, maionese",
          price: 5,
        },
        {
          name: "shahi starter mix",
          whisper: "aloo samosa, chicken samosa, mix pakora, fish finger",
          price: 10,
        },
      ],
    },
    {
      category: "grill",
      image:
        "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "seekh kebab",
          whisper: "carne maccinata di pollo speziata e cotto al forno",
          price: 8,
        },
        {
          name: "chicken tikka",
          whisper:
            "bocconcini di pollo marinati nello yogurt e spezie cotti al forno",
          price: 8,
        },
        {
          name: "chicken tandoori",
          whisper: "pollo al forno speziato",
          price: 8,
        },
        {
          name: "shahi grill",
          whisper: "mix di seekh kebab, chicken tikka e chicken tandoori",
          price: 16,
        },
      ],
    },
    {
      category: "primi di riso",
      image:
        "https://images.pexels.com/photos/2624774/pexels-photo-2624774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        { name: "white rice", whisper: "riso basmati bianco", price: 3 },
        {
          name: "chicken biryani",
          whisper: "riso basmati con pollo, curry, spezie",
          price: 6,
        },
        {
          name: "lamb biryani",
          whisper: "riso basmati con corne di agnello, curry, spezie",
          price: 6.5,
        },
        {
          name: "sabzi biryani",
          whisper: "riso basmati con verdure, curry, spezie",
          price: 5,
        },
        {
          name: "ginga biryani",
          whisper: "riso basmati con gamberetti",
          price: 7,
        },
      ],
    },
    {
      category: "chicken",
      whisper: "secondi di pollo",
      image:
        "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "chicken kofta",
          whisper: "polpette di pollo con salsa curry e spezie",
          price: 7.5,
        },
        {
          name: "chicken malayi",
          whisper:
            "pollo con aglio, zenzero, mandorie, panna da cucina e spezie",
          price: 7.5,
        },
        {
          name: "chicken tikka masala",
          whisper:
            "pollo cotti al forno e saltati in padella con pornodoro e cipolla",
          price: 7.5,
        },
        { name: "chicken palak", whisper: "pollo con spinaci", price: 7.5 },
        {
          name: "chicken jalfrezi",
          whisper: "pollo con peperoni, peperoncino, cipolla, pomodoro, spezie",
          price: 7.5,
        },
        {
          name: "chicken badami",
          whisper: "pollo con salsa mandorie/anacardi e spezie",
          price: 7.5,
        },
      ],
    },
    {
      category: "ghosht",
      whisper: "secondi di carne di agnello e vitello",
      image:
        "https://images.pexels.com/photos/7741801/pexels-photo-7741801.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "mutton korma",
          whisper: "carne di agnello con salsa di pomodoro e yogurt",
          price: 8.5,
        },
        {
          name: "mutton karahi",
          whisper: "carne di agnello con aglio, zenzero, pomodoro e spezie",
          price: 8.5,
        },
        {
          name: "mutton malayi",
          whisper:
            "carne di agnello con aglio, zenzero, mandorie, panna da cucina e spezie",
          price: 8.5,
        },
        {
          name: "mutton masala",
          whisper: "carne di agnello con spinaci",
          price: 8.5,
        },
        {
          name: "mutton vindalo",
          whisper: "carne di agnello con salsa piccante",
          price: 8.5,
        },
        {
          name: "achar ghosht",
          whisper: "carne di agnello con salsa indiana",
          price: 9,
        },
        {
          name: "kebab masala",
          whisper:
            "polpettone di carne di vitello con salsa di cipolla pom, e zenzero",
          price: 8,
        },
        { name: "kofta", whisper: "polpette di vitello al curry", price: 8 },
        {
          name: "keema",
          whisper: "carne macinata di vitello con salsa curry e spezie",
          price: 8,
        },
      ],
    },

    {
      category: "pesce",
      image:
        "https://images.pexels.com/photos/1321124/pexels-photo-1321124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "shahi ginga",
          whisper: "gamberetti con salsa indiana",
          price: 10,
        },
        {
          name: "machli masala",
          whisper: "pesce con salsa indiana",
          price: 10,
        },
        {
          name: "mix vegetable plate",
          whisper: "palak paneer, daal, chana, mix veg, sabzi biryani, naan",
          price: 17,
        },
        {
          name: "mix meat plate",
          whisper: "misto carne, misto verdure, chicken biriyani, naan",
          price: 22,
        },
      ],
    },
    {
      category: "dolci e bevande",
      image:
        "https://images.unsplash.com/photo-1627615891798-15c5d482086a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80",
      products: [
        {
          name: "kheer",
          whisper: "dolce con latte, riso macinato, pistacchio, ricotta",
          price: 3,
        },
        {
          name: "ghulab jamun",
          whisper:
            "latte in polvere, uova, burro, zucchero, soda di bicarbonato",
          price: 3,
        },
        {
          name: "custard",
          whisper: "crema pasticcera con careante al mango o fragola",
          price: 3,
        },
      ],
    },
    {
      category: "bevande indiane",
      image:
        "https://images.pexels.com/photos/7183776/pexels-photo-7183776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "mango lassi",
          whisper: "frullato di mango con yogurt e zucchero",
          price: 3.5,
        },
        {
          name: "lassi",
          whisper: "frullato di yogurt con zucchero o sale",
          price: 3.5,
        },
        {
          name: "jam e shirin lassi",
          whisper: "frullato di yogurt con zucchero e sciroppo di rose",
          price: 2.5,
        },
        {
          name: "banana shake",
          whisper: "frullato di banana con latte e zucchero",
          price: 3.5,
        },
        {
          name: "strawberry shake",
          whisper: "frullato di fragola con latte e zucchero",
          price: 3.5,
        },
        {
          name: "mango shake",
          whisper: "frullato di mango con latte e zucchero",
          price: 3.5,
        },
      ],
    },
    {
      category: "bevande",
      image:
        "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
      // image2:
      //   "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=869&q=80",
      products: [
        { name: "acqua naturale/frizzante 1 lt", price: 2.5 },
        {
          name: "bibita in lattina da 33 cl",
          whisper: "coca, fanta, sprite",
          price: 2,
        },
        {
          name: "bibita in bottiglia 1.5 lt",
          whisper: "coca, fanta, sprite",
          price: 3.5,
        },
      ],
    },
    {
      category: "bevande calde",
      image:
        "https://images.pexels.com/photos/531829/pexels-photo-531829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        { name: "caffe", price: 1 },
        { name: "cappuccino", price: 1.5 },
        { name: "chae", whisper: "the con latte", price: 2.5 },
        { name: "kehwa", whisper: "the alla menta fresco", price: 2.5 },
      ],
    },
    {
      category: "verdure e legumi",
      image:
        "https://images.pexels.com/photos/7351635/pexels-photo-7351635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "chana daal",
          whisper: "lenticchie gialle con spezie",
          price: 5,
        },
        { name: "chana masala", whisper: "cecl con spezie", price: 5 },
        { name: "daal maash", whisper: "lenticchie con spezie", price: 5 },
        { name: "mix sabzi", whisper: "verdure miste con spezie", price: 5 },
        {
          name: "palak paneer",
          whisper: "spinaci con formaggio indiano",
          price: 5,
        },
        {
          name: "shahi paneer",
          whsiper: "curry con frutta secca e formaggio indiano",
          price: 5,
        },
        {
          name: "daal paneer",
          whisper: "lenticchie con formaggio indiano",
          price: 5,
        },
        {
          name: "sabzi kofta",
          whisper: "polpette di verdure con salsa curry",
          price: 5,
        },
      ],
    },
    {
      category: "pane",
      image:
        "https://images.pexels.com/photos/2067621/pexels-photo-2067621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      products: [
        {
          name: "chapati",
          whisper: "pane di farina integrale cotto nel forno",
          price: 1.5,
        },
        {
          name: "naan",
          whisper: "pane di farina bianca cotto nel forno",
          price: 1.5,
        },
        {
          name: "paneer naan",
          whisper: "pane di farina bianca  con formaggio",
          price: 2.5,
        },
        {
          name: "garlic naan",
          whisper: "pane di farina bianca con aglio",
          price: 2.5,
        },
        {
          name: "roghni naan",
          whisper: "pane di farina bianca con semi di sesamo",
          price: 2.5,
        },
        {
          name: "qeema naan",
          whisper: "pane di farina bianca con carne di manzo macinata",
          price: 3.5,
        },
        {
          name: "afghani naan",
          whisper: "pane di farina bianca ripleno di cipolla e spezie",
          price: 2.5,
        },
        {
          name: "sabzi naan",
          whisper: "pane di farina bianca ripleno di verdure e spezie",
          price: 2.5,
        },
      ],
    },
  ]);

  return {
    menu: menu,
  };
};

export default MenuAPI;
