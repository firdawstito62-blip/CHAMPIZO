export interface Ingredient {
  name: string;
  baseAmount: number;
  unit: string;
  note?: string;
}

export interface Step {
  stepNumber: number;
  title: string;
  instruction: string;
  timerMinutes?: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'Plat principal' | 'Entrée & Velouté' | 'Pâtes & Risottos' | 'Poêlées & Accompagnements';
  mushroomType: 'Cèpes' | 'Girolles' | 'Morilles' | 'Trompettes' | 'Pleurotes' | 'Shiitaké & Paris';
  prepTime: number; // in min
  cookTime: number; // in min
  difficulty: 'Facile' | 'Intermédiaire' | 'Chef';
  season: string;
  image: string;
  winePairing: string;
  chefTip: string;
  defaultServings: number;
  ingredients: Ingredient[];
  steps: Step[];
  caloriesPerServing: number;
}

export const RECIPES: Recipe[] = [
  {
    id: 'risotto-cepes',
    title: 'Risotto crémeux aux Cèpes frais & Parmesan 24 mois',
    subtitle: 'Laquintessence des sous-bois italiens et de la gastronomie forestière',
    category: 'Pâtes & Risottos',
    mushroomType: 'Cèpes',
    prepTime: 20,
    cookTime: 25,
    difficulty: 'Intermédiaire',
    season: 'Septembre à Novembre',
    image: '/src/assets/images/recipe_risotto_cepes_1792183943385.jpg',
    winePairing: 'Bourgogne rouge délicat (Pinot Noir de la Côte de Beaune) ou Barolo piémontais',
    chefTip: 'Poêlez la moitié des cèpes en gros morceaux dorés pour le dressage, et hachez le reste finement dans la base du risotto pour diffuser les arômes en profondeur.',
    defaultServings: 4,
    caloriesPerServing: 480,
    ingredients: [
      { name: 'Riz Carnaroli ou Arborio', baseAmount: 320, unit: 'g' },
      { name: 'Cèpes frais fermes (ou réhydratés)', baseAmount: 450, unit: 'g', note: 'brossés et tranchés' },
      { name: 'Bouillon de volaille ou légumes chaud', baseAmount: 1.2, unit: 'L' },
      { name: 'Échalotes traditionnelles', baseAmount: 2, unit: 'pièces', note: 'finement ciselées' },
      { name: 'Vin blanc sec aromatique', baseAmount: 12, unit: 'cl' },
      { name: 'Parmesan Parmigiano Reggiano AOP', baseAmount: 80, unit: 'g', note: 'fraîchement râpé' },
      { name: 'Beurre demi-sel de baratte', baseAmount: 50, unit: 'g' },
      { name: 'Huile d\'olive vierge extra', baseAmount: 2, unit: 'c. à soupe' },
      { name: 'Gousse d\'ail', baseAmount: 1, unit: 'gousse', note: 'écrasée en chemise' },
      { name: 'Thym frais et fleur de sel', baseAmount: 1, unit: 'pincée' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Préparation et saisie des cèpes',
        instruction: 'Brossez délicatement les cèpes au pinceau sans les immerger. Tranchez les chapeaux en belles lamelles de 5 mm et taillez les pieds en petits dés. Dans une poêle en fonte très chaude avec 1 cuillère d\'huile, saisissez les lamelles 3 minutes de chaque côté jusqu\'à belle coloration dorée. Réservez au chaud.',
        timerMinutes: 6
      },
      {
        stepNumber: 2,
        title: 'Nacrage du riz',
        instruction: 'Dans une sauteuse à fond épais, faites suer les échalotes ciselées dans un filet d\'huile d\'olive à feu doux. Ajoutez les dés de pieds de cèpes, puis versez le riz. Remuez 2 minutes jusqu\'à ce que les grains deviennent translucides et nacrés.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Déglacage et cuisson progressive',
        instruction: 'Déglacez avec le vin blanc sec. Laissez évaporer complètement. Versez ensuite le bouillon chaud louche après louche en remuant constamment en huit. Attendez l\'absorption presque totale avant d\'ajouter la louche suivante. Comptez 17 à 18 minutes de cuisson.',
        timerMinutes: 18
      },
      {
        stepNumber: 4,
        title: 'La Mantecatura (liaison crémeuse)',
        instruction: 'Hors du feu, incorporez le beurre froid coupé en dés et le parmesan râpé. Mélangez vigoureusement en fouettant pour créer l\'émulsion onctueuse caractéristique dite "all\'onda". Couvrez 2 minutes.',
        timerMinutes: 2
      },
      {
        stepNumber: 5,
        title: 'Dressage d\'exception',
        instruction: 'Servez dans des assiettes creuses chaudes. Disposez harmonieusement les belles tranches de cèpes dorées sur le dessus, quelques copeaux de parmesan, des feuilles de thym frais et un tour de moulin à poivre.'
      }
    ]
  },
  {
    id: 'supreme-morilles',
    title: 'Suprême de Volaille fermière aux Morilles & Vin Jaune',
    subtitle: 'Le sommet de la tradition culinaire française et des délices printaniers',
    category: 'Plat principal',
    mushroomType: 'Morilles',
    prepTime: 25,
    cookTime: 30,
    difficulty: 'Chef',
    season: 'Mars à Mai (ou toute l\'année séchées)',
    image: '/src/assets/images/recipe_morilles_creme_1792183942948.jpg',
    winePairing: 'Vin Jaune du Jura (Arbois / Château-Chalon) ou Côtes du Jura Savagnin',
    chefTip: 'Si vous utilisez des morilles séchées, filtrez scrupuleusement l\'eau de trempage avec un filtre à café : ce jus concentré est un élixir d\'arômes pour mouiller votre crème.',
    defaultServings: 4,
    caloriesPerServing: 560,
    ingredients: [
      { name: 'Suprêmes de poulet fermier avec peau', baseAmount: 4, unit: 'pièces' },
      { name: 'Morilles fraîches ou séchées (40g séchées)', baseAmount: 250, unit: 'g', note: 'soigneusement rincées et égouttées' },
      { name: 'Vin Jaune du Jura ou vin blanc sec noble', baseAmount: 15, unit: 'cl' },
      { name: 'Crème fraîche épaisse de Normandie (35%)', baseAmount: 300, unit: 'g' },
      { name: 'Échalotes ciselées', baseAmount: 2, unit: 'pièces' },
      { name: 'Beurre doux', baseAmount: 40, unit: 'g' },
      { name: 'Bouillon de volaille réduit', baseAmount: 15, unit: 'cl' },
      { name: 'Cerfeuil frais', baseAmount: 4, unit: 'brins' },
      { name: 'Fleur de sel et poivre blanc de Penja', baseAmount: 1, unit: 'pincée' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Préparation méticuleuse des morilles',
        instruction: 'Lavez les morilles rapidement à l\'eau tiède pour déloger le moindre grain de sable dans leurs alvéoles. Essorez délicatement. Coupez les plus grosses en deux dans le sens de la longueur. Rappel vital : la morille ne se mange jamais crue, elle exige au moins 15 minutes de cuisson.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        title: 'Dorure des suprêmes',
        instruction: 'Assaisonnez les suprêmes de sel et poivre. Dans une sauteuse avec 20g de beurre et un trait d\'huile, faites dorer les volailles côté peau en premier pendant 6 à 7 minutes à feu moyen. Retournez et poursuivez 5 minutes. Retirez et réservez sous aluminium.',
        timerMinutes: 12
      },
      {
        stepNumber: 3,
        title: 'Sautée des morilles et réduction',
        instruction: 'Dans la même poêle dégraissée, ajoutez le reste de beurre et faites suer les échalotes 2 minutes. Ajoutez les morilles et laissez cuire 5 minutes pour évaporer l\'eau. Déglacez généreusement avec le Vin Jaune en raclant les sucs. Laissez réduire de moitié.',
        timerMinutes: 7
      },
      {
        stepNumber: 4,
        title: 'Mijotage crémeux',
        instruction: 'Ajoutez le bouillon de volaille et la crème fraîche d\'Isigny. Remettez les suprêmes dans la sauce onctueuse. Laissez frémir à feu très doux pendant 10 à 12 minutes pour que la chair s\'imprègne du parfum envoûtant des morilles.',
        timerMinutes: 12
      },
      {
        stepNumber: 5,
        title: 'Dressage et finition',
        instruction: 'Nappez les suprêmes de la sauce onctueuse aux morilles veloutée, parsemez de pluches de cerfeuil frais et servez avec des tagliatelles fraîches ou une mousseline de pommes de terre au beurre.'
      }
    ]
  },
  {
    id: 'poelee-girolles',
    title: 'Poêlée de Girolles dorées aux noisettes & échalotes grises',
    subtitle: 'La pureté végétale et le croustillant des sous-bois dans votre assiette',
    category: 'Poêlées & Accompagnements',
    mushroomType: 'Girolles',
    prepTime: 15,
    cookTime: 10,
    difficulty: 'Facile',
    season: 'Juin à Novembre',
    image: '/src/assets/images/recipe_girolles_pan_1792183944168.jpg',
    winePairing: 'Chablis Premier Cru minéral ou Chenin de Loire bien frais',
    chefTip: 'Faites d\'abord suer les girolles à sec dans la poêle chaude sans matière grasse pour chasser leur eau de végétation, jetez l\'eau, puis saisissez au beurre moussant pour qu\'elles restent fermes et dorées.',
    defaultServings: 4,
    caloriesPerServing: 210,
    ingredients: [
      { name: 'Girolles fraîches de pays', baseAmount: 500, unit: 'g', note: 'chapeaux brossés, bouts terreux parés' },
      { name: 'Noisettes entières', baseAmount: 40, unit: 'g', note: 'torréfiées et concassées' },
      { name: 'Échalotes grises', baseAmount: 2, unit: 'pièces', note: 'finement hachées' },
      { name: 'Gousses d\'ail nouveau', baseAmount: 2, unit: 'gousses', note: 'dégermées et pressées' },
      { name: 'Persil plat frais', baseAmount: 1, unit: 'demi-botte', note: 'feuilles hachées' },
      { name: 'Beurre clarifié ou beurre de baratte', baseAmount: 35, unit: 'g' },
      { name: 'Huile de pépins de raisin', baseAmount: 1, unit: 'c. à soupe' },
      { name: 'Fleur de sel et poivre noir concassé', baseAmount: 1, unit: 'pincée' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Nettoyage et concassage',
        instruction: 'Nettoyez les girolles avec un pinceau à poils souples et grattez la base du pied. Concassez les noisettes et torréfiez-les 3 minutes à sec dans une poêle pour exhaler leurs huiles essentielles.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Évacuation de l\'eau de végétation',
        instruction: 'Déposez les girolles dans une grande poêle très chaude sans aucune matière grasse. Laissez-les rendre leur eau pendant 2 à 3 minutes. Égouttez soigneusement le jus s\'il est abondant.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Saisie au beurre noisette',
        instruction: 'Remettez la poêle sur feu vif. Ajoutez l\'huile et le beurre. Dès que le beurre mousse et prend une subtile odeur de noisette, jetez les girolles. Laissez dorer 4 à 5 minutes sans trop remuer pour obtenir de jolis sucs dorés.',
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        title: 'Persillade et éclats croquants',
        instruction: 'Ajoutez les échalotes hachées et l\'ail pressé. Mélangez 1 minute à feu moyen. Hors du feu, jetez le persil plat haché, les noisettes torréfiées concassées, et assaisonnez d\'une belle pincée de fleur de sel.',
        timerMinutes: 1
      }
    ]
  },
  {
    id: 'tagliatelles-trompettes',
    title: 'Tagliatelles fraîches aux Trompettes de la mort & Échalotes',
    subtitle: 'La profondeur boisée du Craterellus cornucopioides sublimée par des pâtes soyeuses',
    category: 'Pâtes & Risottos',
    mushroomType: 'Trompettes',
    prepTime: 15,
    cookTime: 12,
    difficulty: 'Facile',
    season: 'Octobre à Décembre',
    image: '/src/assets/images/recipe_trompettes_pasta_1792183943712.jpg',
    winePairing: 'Syrah des Côtes du Rhône (Crozes-Hermitage) aux notes poivrées ou Chinon rouge',
    chefTip: 'La trompette de la mort possède une forme en cornet creux : fendez-la toujours en deux pour rincer d\'éventuelles brindilles ou grains de terre coincés à l\'intérieur.',
    defaultServings: 4,
    caloriesPerServing: 440,
    ingredients: [
      { name: 'Tagliatelles fraîches aux oeufs', baseAmount: 400, unit: 'g' },
      { name: 'Trompettes de la mort fraîches (ou 35g séchées)', baseAmount: 300, unit: 'g', note: 'fendues et nettoyées' },
      { name: 'Crème liquide entière fleurette', baseAmount: 18, unit: 'cl' },
      { name: 'Échalotes françaises', baseAmount: 3, unit: 'pièces' },
      { name: 'Gousse d\'ail', baseAmount: 1, unit: 'gousse' },
      { name: 'Pecorino Romano ou Parmesan râpé', baseAmount: 50, unit: 'g' },
      { name: 'Ciboulette fraîche', baseAmount: 1, unit: 'botte' },
      { name: 'Beurre doux', baseAmount: 30, unit: 'g' },
      { name: 'Huile d\'olive fruitée', baseAmount: 1, unit: 'c. à soupe' },
      { name: 'Poivre noir de Tellicherry et sel fin', baseAmount: 1, unit: 'pincée' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Nettoyage des trompettes',
        instruction: 'Fendez les trompettes en deux de haut en bas avec les doigts. Rincez-les rapidement sous un filet d\'eau fraîche pour expulser les impuretés du cornet et séchez-les dans un linge propre.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Sautée forestière et réduction crémeuse',
        instruction: 'Faites fondre le beurre avec l\'huile dans une sauteuse. Ajoutez les échalotes émincées et l\'ail écrasé. Dès qu\'elles sont translucides, ajoutez les trompettes de la mort. Faites revenir à feu vif 6 minutes. Versez la crème fleurette et laissez réduire 3 minutes à feu doux jusqu\'à liaison onctueuse.',
        timerMinutes: 9
      },
      {
        stepNumber: 3,
        title: 'Cuisson al dente des tagliatelles',
        instruction: 'Plongez les tagliatelles fraîches dans un grand volume d\'eau bouillante salée. Cuisez exactement 2 à 3 minutes selon l\'épaisseur. Prélevez une demi-louche d\'eau de cuisson des pâtes avant d\'égoutter.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Enrobage et dressage généreux',
        instruction: 'Versez les tagliatelles égouttées directement dans la sauteuse avec la sauce aux trompettes et la cuillère d\'eau de cuisson. Mélangez vivement à la pince pour enrober les pâtes. Servez dans de grands bols avec le pecorino, la ciboulette ciselée et un tour de moulin à poivre généreux.'
      }
    ]
  },
  {
    id: 'veloute-girolles-chataignes',
    title: 'Velouté automnal de Girolles aux éclats de Châtaignes',
    subtitle: 'Une entrée réconfortante et soyeuse aux parfums d\'humus et de sous-bois',
    category: 'Entrée & Velouté',
    mushroomType: 'Girolles',
    prepTime: 20,
    cookTime: 25,
    difficulty: 'Facile',
    season: 'Automne',
    image: '/src/assets/images/recipe_girolles_pan_1792183944168.jpg',
    winePairing: 'Vin blanc sec de Bourgogne (Saint-Véran ou Mâcon-Villages)',
    chefTip: 'Pour un velouté ultra-soyeux sans grumeaux, passez-le au mixeur plongeant puis à travers un chinois fin avant d\'ajouter la touche finale de crème fouettée.',
    defaultServings: 4,
    caloriesPerServing: 290,
    ingredients: [
      { name: 'Girolles fraîches', baseAmount: 400, unit: 'g' },
      { name: 'Châtaignes cuites au naturel sous vide', baseAmount: 200, unit: 'g' },
      { name: 'Blanc de poireau', baseAmount: 1, unit: 'pièce', note: 'émincé finement' },
      { name: 'Pomme de terre type Bintje', baseAmount: 1, unit: 'pièce', note: 'pour le liant' },
      { name: 'Bouillon de légumes corsé', baseAmount: 80, unit: 'cl' },
      { name: 'Crème fraîche liquide (30%)', baseAmount: 15, unit: 'cl' },
      { name: 'Beurre doux', baseAmount: 30, unit: 'g' },
      { name: 'Huile de noisette', baseAmount: 1, unit: 'c. à café' },
      { name: 'Sel et poivre blanc', baseAmount: 1, unit: 'pincée' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Suée aromatique',
        instruction: 'Dans une cocotte, faites fondre le beurre et faites suer le blanc de poireau et la pomme de terre coupée en petits cubes pendant 5 minutes sans coloration.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        title: 'Ajout des champignons et châtaignes',
        instruction: 'Réservez quelques jolies petites girolles entières pour la garniture. Ajoutez le reste des girolles et 150g de châtaignes dans la cocotte. Faites revenir 4 minutes.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        title: 'Cuisson au bouillon',
        instruction: 'Mouillez avec le bouillon de légumes chaud. Portez à frémissement, couvrez et laissez cuire 15 minutes à feu moyen.',
        timerMinutes: 15
      },
      {
        stepNumber: 4,
        title: 'Mixage velouté et poêlée minute',
        instruction: 'Mixez au blender jusqu\'à texture perfectly onctueuse et incorporez la crème. Pendant ce temps, poêlez rapidement les girolles réservées avec les châtaignes restantes émiettées dans une noix de beurre.',
        timerMinutes: 4
      },
      {
        stepNumber: 5,
        title: 'Dressage raffiné',
        instruction: 'Versez le velouté chaud dans des bols, déposez au centre les girolles et châtaignes poêlées, puis terminez avec quelques gouttes d\'huile de noisette et une pincée de poivre moulu.'
      }
    ]
  },
  {
    id: 'poelee-cepes-bouchons',
    title: 'Cèpes bouchons rôtis à la persillade et fleur de sel',
    subtitle: 'La recette mythique des cueilleurs : texture ferme, noisette et beurre moussant',
    category: 'Poêlées & Accompagnements',
    mushroomType: 'Cèpes',
    prepTime: 10,
    cookTime: 12,
    difficulty: 'Facile',
    season: 'Automne',
    image: '/src/assets/images/hero_mushroom_gastronomy_1792183941391.jpg',
    winePairing: 'Pomerol ou Saint-Émilion Grand Cru, ou un Graves rouge classique',
    chefTip: 'Privilégiez les petits cèpes "bouchons" fermes dont les tubes sous le chapeau sont encore blancs. Coupez-les en quatre dans la longueur sans séparer le chapeau du pied.',
    defaultServings: 4,
    caloriesPerServing: 240,
    ingredients: [
      { name: 'Petits cèpes bouchons fermes', baseAmount: 600, unit: 'g' },
      { name: 'Beurre de baratte demi-sel', baseAmount: 45, unit: 'g' },
      { name: 'Huile de tournesol ou pépins de raisin', baseAmount: 1, unit: 'c. à soupe' },
      { name: 'Gousses d\'ail rose', baseAmount: 3, unit: 'gousses', note: 'finement hachées' },
      { name: 'Persil plat frais haché', baseAmount: 3, unit: 'c. à soupe' },
      { name: 'Fleur de sel de Guérande', baseAmount: 1, unit: 'pincée' },
      { name: 'Poivre noir du moulin', baseAmount: 1, unit: 'tour de moulin' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Préparation au couteau',
        instruction: 'Brossez les cèpes avec soin. Si le pied est un peu terreux, pelez la peau superficielle comme une carotte à l\'économe. Fendez-les en deux ou en quatre selon leur grosseur.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Première saisie vive à l\'huile',
        instruction: 'Chauffez une poêle en fonte avec la cuillère d\'huile. Déposez les morceaux de cèpes face tranchée contre la poêle sans les chevaucher. Laissez dorer 4 minutes sans remuer.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        title: 'L\'arrivée du beurre mousseux',
        instruction: 'Ajoutez le beurre en morceaux. Baissez légèrement le feu et arrosez régulièrement les cèpes avec le beurre moussant à la cuillère pour une cuisson homogène et moelleuse.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Persillade éclatante et dégustation',
        instruction: 'Une minute avant la fin, incorporez l\'ail et le persil. Remuez doucement. Retirez du feu, parsemez de fleur de sel de Guérande et servez immédiatement sur des toasts de pain au levain grillé.'
      }
    ]
  }
];

export interface MushroomGuide {
  id: string;
  name: string;
  latinName: string;
  season: string;
  flavorProfile: string;
  foragingTip: string;
  culinaryRule: string;
  pairsWith: string[];
}

export const MUSHROOM_GUIDES: MushroomGuide[] = [
  {
    id: 'cepes',
    name: 'Cèpe de Bordeaux & Cèpe d\'été',
    latinName: 'Boletus edulis',
    season: 'Août à Novembre (selon les pluies de lune)',
    flavorProfile: 'Puissant goût de noisette douce, texture charnue et onctueuse, arômes intenses de sous-bois.',
    foragingTip: 'Cherchez sous les chênes, hêtres, châtaigniers et épicéas 8 à 10 jours après un choc hydrique chaud.',
    culinaryRule: 'Ne jamais faire tremper dans l\'eau ! Brossage délicat au couteau ou chiffon humide. Saisir à feu vif pour caraméliser la chair.',
    pairsWith: ['Viandes rouges', 'Canard', 'Risotto crémeux', 'Parmesan', 'Ail noir', 'Noisettes']
  },
  {
    id: 'girolles',
    name: 'Girolle & Chanterelle commune',
    latinName: 'Cantharellus cibarius',
    season: 'Mai à Novembre',
    flavorProfile: 'Notes fruitées d\'abricot sec, saveur délicate poivrée, texture ferme et soyeuse qui ne ramollit pas.',
    foragingTip: 'Pousse en troupes souvent cachée sous la mousse dans les forêts de feuillus et conifères aérées.',
    culinaryRule: 'Faites-les d\'abord suer à sec dans une poêle sans matière grasse pour éliminer l\'eau amère avant de beurrer.',
    pairsWith: ['Volaille', 'Oeufs mollets / Omelettes', 'Vin blanc sec', 'Échalotes grises', 'Noisettes']
  },
  {
    id: 'morilles',
    name: 'Morille blonde & Morille conique',
    latinName: 'Morchella esculenta / elata',
    season: 'Mars à Mai (champignon printanier)',
    flavorProfile: 'Saveur fumée et terreuse très concentrée, persistance remarquable en bouche, parfum voluptueux.',
    foragingTip: 'Sur les terres remuées, sous les frênes, ormes, et dans les vergers de pommiers au printemps.',
    culinaryRule: 'IMPORTANT : Toxique crue (présence d\'hémolysines). Exige une cuisson complète d\'au moins 15 minutes à cœur.',
    pairsWith: ['Vin Jaune du Jura', 'Crème fraîche épaisse', 'Veau', 'Volaille fermière', 'Pâtes fraîches']
  },
  {
    id: 'trompettes',
    name: 'Trompette de la mort / Chanterelle noire',
    latinName: 'Craterellus cornucopioides',
    season: 'Septembre à Décembre',
    flavorProfile: 'Arôme boisé presque truffé, note épicée, parfum remarquable qui supporte admirablement le séchage.',
    foragingTip: 'Se dissimule sous les feuilles mortes de hêtres et chênes, particulièrement après de fortes pluies d\'automne.',
    culinaryRule: 'Fendez le cornet en deux avec les doigts pour ôter la terre nichée à l\'intérieur du tube creux.',
    pairsWith: ['Viandes de gibier', 'Tagliatelles fraîches', 'Sauces crémées', 'Péchés d\'échalotes', 'Canard confit']
  }
];

export const CHEF_SECRETS = [
  {
    title: 'Le Mythe du Trempage',
    subtitle: 'Pourquoi l\'eau est l\'ennemi du champignon',
    description: 'Les champignons sont de véritables éponges composées à 90% d\'eau. Les laver à grande eau détruit leur structure cellulaire et les noie. Utilisez un couteau à lame recourbée muni d\'une brosse en soies de sanglier ou un linge légèrement humidifié.',
    badge: 'Règle N°1'
  },
  {
    title: 'La Saisie en Deux Temps',
    subtitle: 'La caramélisation des sucs sans bouillir',
    description: 'Pour éviter que vos champignons ne bouillent dans leur propre jus : poêlez-les d\'abord à feu vif avec une pointe d\'huile neutre. Laissez l\'eau s\'évaporer, puis baissez le feu et ajoutez le beurre demi-sel, l\'ail écrasé et le persil seulement sur les 2 dernières minutes.',
    badge: 'Règle N°2'
  },
  {
    title: 'Le Trésor de Réhydratation',
    subtitle: 'Ne jetez jamais l\'eau des champignons séchés',
    description: 'Lorsque vous réhydratez des morilles, cèpes ou trompettes séchées dans de l\'eau tiède (ou du bouillon tiède), filtrez ce liquide avec un filtre à café ou une étamine fine pour retenir les dépôts. Ce bouillon sombre est un concentré d\'arômes umami prodigieux pour vos sauces et risottos.',
    badge: 'Règle N°3'
  },
  {
    title: 'Le Sel au Dernier Moment',
    subtitle: 'La physique du sel en mycologie',
    description: 'Le sel extrait l\'eau par osmose. Si vous salez au tout début, vos champignons vont dégorger immédiatement et ramollir. Assaisonnez d\'une pincée de fleur de sel à la minute où vous dressez.',
    badge: 'Règle N°4'
  }
];
