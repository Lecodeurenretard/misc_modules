//Les classes qui vont suivre représentent les ensembles de nombres.

//import { Mathemathics } from "fonctionsMath.js";
/**
 * Une classe template servant de base pour les réels.
 * N'est pas conçu pour avoir des objets.
 */
class abstractNumber {
    value;

    constructor(val){
        if(isNaN(val)){
            this.value = NaN;
        }else if(Mathemathics.isInf(val)){
            this.value = undefined;
        }else{
            this.value = val;
        }
    }

    /**
     * Si x appartient à est un nombre
     * @param {Number} x L'élément testé.
     * @returns {Boolean} Si x appartient à R
     */
    static isPartOfThis(x){
        return (!Mathemathics.isInf(x) && !Number.isNaN(x) && !Complexe.isPartOfThis(x))
    }

    toNumber(){
        return this.value;
    }

    toString(){
        return this.value.toString();
    }

    /**
     * Renvoie si les x et y sont égaux
     * @param {abstractNumber} x 
     * @param {abstractNumber} y 
     * @returns {Boolean} x==y
     */
    static isEq(x, y){
        return (x.value == y.value);
    }

    /**
     * @param {abstractNumber} x 
     * @param {abstractNumber} y 
     * @returns {Boolean} x > y
     */
    static isSup(x, y){
        return (x.value > y.value);
    }
}

/**
 * L'ensemble des (entiers) naturels (N):  tous les entiers positifs.
 * L'équivalent en programmation serait le type unsigned int
 */
class Naturel  extends abstractNumber{

    constructor(value){
        super(value);
    
        if (Number.isInteger(value) && value > 0) {
            this.value = value;
        } else {
            this.value = Math.abs(Math.round(value));
            console.info('parameter "value" rounded and made positive from ' + value.toString() + ' to ' + this.value.toString(10) + ' at the constructor of "Naturel"')
        }
    }


    /**
     * Si x appartient à N 
     * @param {*} x L'élément testé.
     * @returns {Boolean} Si x appartient à N
     */
    static isPartOfThis(x){ //Je l'ai nommé comme ceci à cause de l'héritage
        return (Number.isInteger(x) && x >= 0);
    }

    /**
     * Convertit x en Naturel
     * @param {Number | String | Complexe} x Le nombre à être convertit.
     * @returns {Naturel} x convertit en Naturel (si le x est Complexe, seule la partie réelle sera prise)
     */
    static toThis(x){
        if (Complexe.isPartOfThis(x)) {
            x = x.real;
        }

        let X = Math.abs(x);

        return Math.round(X);
    }
}

/**
 * L'ensemble des (entiers) relatifs (Z): tous les nombres entiers.
 * l'équivalent en programation serait int
 */
class Relatif extends abstractNumber{
    constructor(a){
        super(a);

        const A = a.toString(10);
        
         if (Complexe.isPartOfThis(a)) {    //si c'est un complexe
            a = a.real;
        }else if (!Number.isInteger(a)) {
            a = Math.round(a);
        }

        
    }

    /**
     * Si x appartient à Z 
     * @param {*} x L'élément testé.
     * @returns {Boolean} Si x appartient à Z
     */
    static isPartOfThis(x,){
        return (Number.isInteger(x))
    }

    /**
     * Convertit x en Relatif
     * @param {Number | String | Complexe} x Le nombre à être convertit.
     * @returns {Relatif} x convertit en Relatif (si le x est Complexe, seule la partie réelle sera prise)
     */
    static toThis(x){
        if (!Complexe.isPartOfThis(x)) {
            return Math.round(x);
        }

        return Math.round(x.real);
    }
}

/*
 * L'ensemble des décimaux (D): tous les nombres avec une partie décimale finie.

Abandonné à cause de la méthode isPartOfTHis() qui dont la logique n'a pas été trouvée

class Decimal extends Naturel{  
//Toutes les classes héritent de Naturel à cause des constructeurs qui risquent de s'appeler en casacade du fait de la présence de super()

    constructor(x, accuracy = 3,sauf0 = false){
        super(x, sauf0);

        if (!Number.isFinite(x)) {
            x = Mathemathics.truncFloat(x, accuracy);
        }

        if(!Relatif.isPartOfThis(x)){
            this.value = x;
        }
    }

    /**
     * Si x appartient à D 
     * @param {Number} x Le nombre testé.
     * @param {Boolean} starred Si true, l'ensemble testé est D*. Par défaut sur false
     * @returns {Boolean} Si x appartient à D
     /
    static isPartOfThis(x, starred = false){
        staf = true;
        if (starred) {
            star = (x != 0)
        }

        return isFinite(x) && star;
    }
} */

/*
 * L'ensemble des rationels  (Q)
    abandonnée aussi pour les mêmes raisons.
class Rationel{}
 */


/**
 * L'ensemble des Réels (R): Tous les nombres à virgule (pi, e, √2, 3.7, 1/3, ...)
 */
class Reel extends abstractNumber{
    constructor(x){
        super(x)

        if (typeof(x) != number) {
            this.value = this.value.reel
        }
    }

    /**
     * Si x appartient à R 
     * @param {Number} x Le nombre testé.
     * @param {Boolean} starred Si true, l'ensemble testé est R*. Par défaut sur false
     * @returns {Boolean} Si x appartient à R
     */
    static isPartOfThis(x, starred = false){
        let star = true;
        if (starred) {
            star = (x !=0);
        }

        return (!Mathemathics.isInf(x) && !Number.isNaN(x) && star)
    }


    /**
     * Convertit x en Réel
     * @param {Number} x Le nombre à être convertit.
     * @returns {Reel | Number} Si x appartient à R ou tends vers ∓∞
     */
    static toThis(x){
        
        if(Reel.isPartOfThis(x)){
            return new Reel(x);
        }else if(x == Number.POSITIVE_INFINITY){
            return new Reel(Number.MAX_VALUE);
        }else if (x == Number.NEGATIVE_INFINITY) {
            return new Reel(-Number.MAX_VALUE)
        }

        return NaN;
    }
}

/**
 * L'ensemble des complexes (C): Regroupe tout les nombres utilisés sur la base de i = √(-1).
 * Cette classe n'hérite pas de abstractNumber.
 */
class Complexe{
    constructor(realPart, imaginaryPart){
        this.real = realPart;
        this.img = imaginaryPart;
        this.arg = new Angle(Math.atan(imaginaryPart/realPart), "radian");  //arctan(b/a)
        this.module = Math.sqrt(realPart**2 + imaginaryPart**2);    //√(a²+b²)
    }

    /**
     * Représente le nombre en string
     * @param {String} forme="alg" | La forme sous laquelle représenter le nombre:
     * "alg": algébrique (a + bi);
     * "trig": trigonométrique (r[cos θ + isin θ]);
     * "exp": exponentielle (re^(iθ)).
     * 
     * @returns {String} Retoune undefined si l'argument forme est incorrect. 
     */
    toString(forme = "alg"){
        switch (forme) {
            case "alg":
                return this.real.toString() + ' + ' + this.img.toString() + 'i' 
            
            case "trig":
                return this.module.toString() + "( cos " + this.arg.toString() + " + isin " + this.arg.toString() + ' )';
        
            case "exp":
                return this.module.toString() + ' * e^(i' + this.arg.toString() + ')'
            default:
                return undefined;
        }
    }

    /**
     * this = z
     * @param {Complexe} z 
     */
    setTo(z){
        this.real = z.real;
        this.img = z.img;
        this.arg = z.arg;
        this.module = z.module;
    }

    /**
     * Initialise l'objet courant par les données données par la forme exponetielle
     * @param {Number | Reel} module Le module du nombre (r).
     * @param {Number | Reel} argument L'argument du nombre (θ) mesuré dans le sens conventionel.
     * @returns {undefined | null} Retourne null si l'un des seux paramètre n'est pas une instance de abstractNumber ou si le nombre n'est pas un reel.
     */
    initExpo(module, argument){
        if (module instanceof abstractNumber) { //si module ou argument sont des abstractNumber alors on les convertit en nombre
            module = module.value;
        }
        if (argument instanceof abstractNumber) {
            argument = argument.value;
        }


        if(!Reel.isPartOfThis(module) || !Reel.isPartOfThis(argument)){     //on vérifie si module et arguments sont valides
            return null;
        }

        this.arg = argument;
        this.module = module;
        this.real = module * Math.cos(argument);
        this.img = module * Math.sin(argument);
        /*a + bi = rcos θ + i rsin θ
            on en déduit que a = r*cos θ
            et que b = r*sin θ
        */
       return undefined;
    }

    /**
     * Initialise un objet sans les données de la forme algébrique
     * @param {Number | Reel} modulus Le module du nombre.
     * @param {Number | Reel} arg L'argument du nombre (dans le sens conventionel)
     * @returns {Complexe} Le nombre complexe correspondant aux données fournies.
     */
    static init(modulus, arg){
        let z = new Complexe(1, 0);
        z.initExpo(modulus, arg);
        return z;
    }

    /**
     * Calcule le module du nombre pour z = a + bi
     * @param {Number | Reel} a La partie réelle
     * @param {Number | Reel} b La partie imaginaire
     * @returns {Number} La valeur absolue de z.
     */
    static calcModulus(a, b){
        if (a instanceof abstractNumber) {
            a = a.value;
        }
        if (b instanceof abstractNumber) {
            b = b.value;
        }
        return Math.sqrt(a**2 + b**2);  //distance entre deux points (cours de 2nde)
    }
    /**
     * Calcule l'argument de z pour z = a + bi
     * @param {Number | Reel} a La partie réelle
     * @param {Number | Reel} b La partie imaginaire
     * @returns {Number} L'argument de z (exprimé en radian)
     */
    static calcArg(a, b){
        if (a instanceof abstractNumber) {
            a = a.value;
        }
        if (b instanceof abstractNumber) {
            b = b.value;
        }
        return Math.atan(b/a);
    }

 


    /**
     * Ajoute z1 et z2
     * @param {Complexe} z1 
     * @param {Complexe} z2
     * @returns {Complexe} 
     */
    static add(z1, z2){
        return new Complexe(z1.real + z2.real, z1.img + z2.img);
    }

    /**
     * Soustrait z1 par z2
     * @param {Complexe} z1 
     * @param {Complexe} z2
     * @returns {Complexe} 
     */
    static substract(z1, z2){
        return new Complexe(z1.real - z2.real, z1.img - z2.img);
    }

    /**
     * Multiplie z1 et z2 entre eux
     * @param {Complexe} z1 
     * @param {Complexe} z2 
     * @returns {Complexe}
     */
    static multiply(z1, z2){
        return Complexe.init(z1.module * z2.module, z1.arg + z2.arg);
        /*On multiplie avec la forme exponentielle:
        z1 = r * e^(iθ)
        z2 = m * e^(iα)

        z1 * z2 = (r * m) (e^(iθ) * e^(iα)) = rm * e^(iθ + iα) = rm * e^[i (θ + α)]
        */ 
    }

    /**
     * Divise z1 par z2
     * @param {Complexe} z1 
     * @param {Complexe} z2 
     */
    static divide(z1, z2){
        return Complexe.init(z1.module / z2.module, z1.arg - z2.arg);
        /*On divise toujours par la forme exponetielle
        
        z1 = r * e^(iθ)
        z2 = m * e^(iα)

        z1 / z2 = (r * e^[iθ]) / (m * e^[iα]) = r/m * e^(iθ) * e^(-iα) = r/m e^[i(θ - α)]
        */ 
    }

      /**
     * Ajoute z à l'élément
     * @param {Complexe} z Le nombre à ajouter
     * @param {boolean} set=false | si this doit être mit au résultat 
     * @returns {Complexe} 
     */
       add(z, set = false){
        const result = new Complexe(this.real + z.real, this.img + z.img);

        if(set){this.setTo(result)}

        return result;
    }

    /**
     * Soustrait this par z
     * @param {Complexe} z Le nombre à soustraitre
     * @param {Boolean} set=false | si this doit être mit au résultat
     * @returns {Complexe} 
     */
    substract(z, set){
        const result = new Complexe(this.real - z.real, this.img - z.img);
        
        if(set){this.setTo(result)}
        
        return result;
    }

    /**
     * Multiplie this et z entre eux
     * @param {Complexe} z Le nombre auquel multiplier this
     * @param {Boolean} set=false | si this doit être égal au résultat
     * @returns {Complexe}
     */
    multiply(z, set){
        const result = Complexe.init(this.module * z.module, this.arg + z.arg);
        
        if(set){this.setTo(result)}
        
        return result;
    }

    /**
     * Divise this par z
     * @param {Complexe} z Le nombre par lequel diviser this
     * @param {Boolean} set=false | si this doit être égal au résultat
     * @returns {Complexe}
     */
    divide(z, set){
        const result = Complexe.init(this.module / z.module, this.arg - z.arg);
        
        if(set){this.setTo(result)}
        
        return result;
    }


    /**
     * Donne l'inverse du nombre complexe
     * @returns {Complexe | undefined} retourne undefined si l'objet est nul
     */
    inverse(){
        if (this.is0()) {
            return undefined;
        }

        const sqMod = (this.module)**2,
            a = this.real,
            b = this.img;

        return new Complexe(a/sqMod, -b/sqMod);

        /*l'inverse de z est 1/z
        z = a+bi
        1/z = 1/(a+bi) = (a-bi)/[(a+bi)(a-bi)] = (a-bi)/(a² + b²)
        or r (le module) = √(a² + b²)
        => r² = a² + b²

        =>1/z = (a-bi)/(a²+b²) = (a-bi)/r² = Z/r²
        */
    }
    /**
     *Donne le conjugué du nombre.
     * (pour z = a + bi, son conjugué Z = a - bi)
     * @returns {Complexe}
     */
    conjug(){
        return new Complexe(this.real, -this.img);
    }

    /**
     * Elève this à la puissance n via la méthode récursive (z^5 = z*z*z*z*z).
     * @param {Number | Relatif} n La puissance à laquelle élever this.
     * @param {Boolean} set=true |  Si this doit changer de valeur pour être égal au résultat
     * @returns {Complexe | undefined | Number} Renvoie undefined si n n'est pas entier, NaN si ce n'est pas un nombre
     */
    nthPower(n, set=true){
        if (n instanceof Relatif ||n instanceof Naturel) {
            n = n.value
        }else if(n instanceof abstractNumber || n instanceof Complexe){
            return undefined;
        }else if (typeof(n) != "Number") {
            return NaN;
        }


        if (n == 0) {
            return 1;
        }

        const base = this;
        if (n > 0) {
            for (let i = 0; i < n; i++) {       //J'utilise la formule récursive car je ne suis pas sur que (a^b)^c = a^(bc) marche dans les complexes
                this.multiply(base, set);
            }

            return this;
        }

        for (let i = 0; i < n; i++) {
            this.divide(base, true);
        }
        return this;
    }

    /**
     * Elève z à la puissance x sans la méthode récursive (z^x = |z|^x * e^(ix * arg[z]) )
     * @param {Complexe} z Le complexe devant être élevé.
     * @param {Number | Reel} x La puissance
     * @returns {Complexe}
     */
    static exponent(z, x){
        if (x instanceof abstractNumber) {
            x = x.value
        }

        let arg = z.arg * x,
            mod = z.module**x, 
            new_z = (new Complexe(0, 1));   //i
        new_z.initExpo(mod, arg);
        
        return new_z;

        /*Voici la démonstration:
        soit z = re^(ix), t ∈ R
        
        z^t = exp[ln(z^t)] 
        = exp[t * ln(re^(ix))] 
        = exp[t(ix + ln r)] 
        = e^(ixt) * e^(tln r)
        = e^(ixt) * r^t
        
        soit X = xt; R = r^t 
        => z^t = R * e^(iX)

        Je rappelle la forme exponentielle d'un nombre complexe: 
        z = re^(iθ) avec r = |z|, θ = arg(z), i = √-1 et e ≈ 2.72
        */
    }

     /**
     * Elève z à la puissance x sans la méthode récursive (z^x = |z|^x * e^(ix * arg[z]) )
     * @param {Boolean} set Si l'on doit set this au résultat
     * @param {Number | Reel} x Le nombre en haut de la puisance.
     * @param {Complexe}
     */
    exponent(x, set = true){
        const result = Complexe.exponent(this, x);
        if (set) {
            this.setTo(result);
        }

        return result;
    }

    /**
     * Vérifie si this est nul
     * @returns {Boolean}
     */is0(){
        return this.module == 0;   
        //r (n')est nul (que) quand a et b sont nuls (donc le nombre)
    }

    /**
     * Vérifie si z == this
     * @param {Complexe} z Le nombre à comparer.
     * @returns {Boolean}
     */
    isEq(z){
        return (this.real == z.real && this.img == z.img);
    }
}

/**
 * Une classe pour des angles (seul les degrés et les radians sont reconnus comme des unitées).
 */
class Angle{
    /**
     * @param {Number | Reel} val La valeur de l'angle.
     * @param {String} unit = "degree"; L'unitée utilisée, si la valeur entrée n'est ni "degree" ni "radian" alors l'angle n'aura aucune unitée (unit = "none"),
     *  dans ce cas là certaine méthodes sont indisponibles à l'objet.
     */
    constructor(val, unit = "degree"){
        if (unit == "radian" || unit == "degree") {
            this.unit = unit;
        }else{
            this.unit = "none";
        }

        this.value = val;
    }

    /**
     * @param {String | undefined} unit=undefined | L'unitée dans laquelle exprimer l'angle (n'aura pas d'effet si l'objet à une unité none);
     *  pour exprimer l'angle dans son unité courante passer undefined.
     * @param {Boolean} fullNotation=false |  Si on exprime toutes les valeurs de l'angle ( +2πn || +360n), n'a aucun effet si l'unité est none.
     * @returns {String} L'angle sous forme de string;  retourne null si unit est incorrect.
     */
    toString(unit = undefined, fullNotation = false){
        if (unit == undefined) {
            unit = this.unit;
        }
        if (fullNotation && unit != "none") {
            const val = Angle.convertTo(Angle.defaultNotation(this), unit, true).toString();    //l'angle dans la bonne unité et dans son écriture par défaut
           
            return val + ((unit == "radian") ? " +2πn" : " + 360n") + ((unit == "radian") ? " rad" : '°');  //soit on a "θ +2πn rad" soit on a "α + 360n°"
        }

        switch (unit) {
            case "none":
                return this.value.toString();
            
            case "radian":
                return this.value.toString() + " rad";

            case "degree":
                return this.value.toString() + '°';
        
            default:
                return null;
        }
    }

    
    
    /**
    * Convertit les degrés en radians.
    * @param {Number | Angle} angle L'angle devant être convertit (doit être en degré), si c'est un objet Angle alors on utilisera la version objet.
    * @param {Boolean} coef= false | Si true, la fonction ne retournera que le coefficient. On peut donc écrire pour tout a (avec cette fonction représentée par f()): f(a) = π*f(a, true)
    * @returns {Number}  L'équivalent en radian.
    */
    static convertToRadian(angle, coef=false){
        if (angle instanceof Angle) {
            angle = angle.value;
        }

        if (!coef) {
            angle *= Math.PI;
        }
    
        return angle/ 180
    }
    /**
    * Convertit les radians en degrés.
    * @param {Number | Angle} angle number L'angle devant être convertit (doit être en radian).
    * @returns {Number}  L'équivalent en degré.
    */
    static convertToDegree(angle){
        if (angle instanceof Angle) {
            angle = angle.value;
        }

        return angle * 180 /Math.PI
    }

    /**
     * Convertit un angle.
     * @param {Angle | Number | Reel} angle L'angle à être convertit.
     * @param {String} what L'unité vers laquelle convertir l'angle; si "none" on retournera juste la valeur de l'angle.
     * @param {Boolean} coef L'argument à passer à convertToRadian().
     * @returns {Number | null} La valeur de l'angle convertit; 
     * renvoie null si what est incorrect.
     */
    static convertTo(angle, what, coef=false){
        if (angle instanceof abstractNumber) {
            angle = angle.value;
        }else if(!(angle instanceof Angle) && typeof angle == "object"){
            return null;
        }

        switch (what) {
            case "radian":
                return Angle.convertToRadian(angle, coef);
            
            case "degree":
                return Angle.convertToDegree(angle);
        
            case "none":
                if (angle instanceof Angle) {
                    return angle.value
                }
                return angle;


            default:
                return null;
        }
    }
    
    /**
     * Convertit l'angle en degré.
     * @returns {Angle| undefined} Retourne l'angle une fois convertit, si l'unité est "none" alors la fonction retournera undefinded.
     */
    convertToDegree(){
        if (this.unit == "none") {
            return undefined;
        }else if(this.unit == "radian"){
            return this;
        }

       this.value *= 180/Math.PI;
       this.unit = "degree";

       return this;
    }

    /**
    * Fait l'objet se convertir en radian.
    * @param {Boolean} coef=false | Si true, la fonction ne retournera que le coefficient. On peut donc écrire pour tout a (avec cette fonction représentée par f()): f(a) = π*f(a, true)
    * @returns {Angle | undefined} L'objet convertit; retourne undefined si l'bjet n'a pas d'unité
    */
    convertToRadian(coef = false){
        if (this.unit == "none") {
            return undefined;
        }else if(this.unit == "degree"){
            return this;
        }
        let pi = Math.PI;
        if (coef) {
            pi = 1;
        }

        this.value *= pi/180;
        this.unit = "radian";
        
        return this;
    }

    /**
     * Appelle les differentes fonctions de convertion; permet la convertion vers "none" (juste la valeur).
     * @param {String} what Vers quel unitée convertir l'angle; si none mettera l'unité à "none" et renverra la valeur de l'angle.
     * @param {Boolean} coef=false | L'argument passé à .convertToRadian() et effectif seulment dans ce cas là.
     * @returns {Angle | undefined | null} Retourne l'objet une fois convertit.
     * Retourne undefined si l'objet à une unité none et renvoie null si what est incorrect.
     */
    convertTo(what, coef = false){
        switch (what) {
            case "radian":
                return this.convertToRadian(coef);
            
            case "degree":
                return this.convertToDegree();
        
            case "none":
                this.unit = "none";
                return this.value;

            default:
                return null;
        }
    }

    /**
     * Renvoie la valeur "par défaut" de l'angle fourni, c'est à dire sa valeur appartenant à [0°; 360°[
     * @param {Angle} alpha 
     * @returns {Angle} L'angle dans sa forme par défaut.
     */
    static defaultNotation(alpha){
        const unit = alpha.unit;

        alpha.convertToDegree();        //on convertit en degrés pour ne pas à avoir à faire -6.28304... à chaque itération

        let newVal = alpha.value;

        if(newVal < 0){
            do {
                newVal += 360;
            } while (newVal >= 0);
        }else{
            while (newVal < 360){
                newVal -= 360;
            } 
        }

        if (unit == "radian") {
           newVal = Angle.convertToRadian(newVal);
        }

        return newVal;
    }

    /**
     * Renvoie la valeur "par défaut" de l'angle, c'est à dire sa valeur appartenant à [0°; 360°[
     * @returns {Angle}
     */
    defaultNotation(){
        let beta = Angle.defaultNotation(this);
        this.value = beta.value;
        return this;
    }
}