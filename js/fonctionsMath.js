//import { Fraction } from "fractions.js";

/**
 * Une interface contenant des fonctions relatives aux Mathématiques
 */
class Mathemathics{
    /**
     * @param {Number} x Le nombre à tester
     * @returns {Boolean} Si x == +|- infini
     */
    static isInf(x){
        return (x==Number.NEGATIVE_INFINITY || x==Number.POSITIVE_INFINITY);
    }

    /**
     * Vérifie si x est premier (n'ayant que 1 et lui-même pour diviseur dans N) 
     * @param {Number} x  Le nombre à tester.
     * @returns {Boolean | undefined} Si le nombre est premier, si x n'est pas entier retourne undefined
     */

    static isPremier(x){
        if (!Number.isInteger(x)) {
            return undefined;
        }
        x = Math.abs(x) //si x est négatif
        
        if (x==1) {
            return false;
        }

        numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        if (numbers.includes(x)) {return true;}
        numbers.forEach(premier => {
            if ((numbers % premier) == 0) {
                return false;
            }
        });
        return true;
    }

    /*static isCarreParfait(x){
        return this.isEntier(Math.sqrt(x))
    }*/

    /**
     * Vérifie si x est entier
     * @param {Number} x Le nombre à tester 
     * @returns {Boolean} Si le nombre est entier
     */
    static isEntier(x){
        return Number.isInteger(x);
    }

    /**
     * Logarithme en base base de a
     * @param {Number} x Le paramètre du logarithme
     * @param {Number} base La base du logarithme par défaut: 10
     * @returns {Number} Le logarithme en base base de a
     */
    static log(x, base = 10){
        x = Math.round(x);
        const lnx = Math.log(x),        //Math.log(x) <=> ln x
            lnBase  = Math.log(base);
        
        return lnx/lnBase;      
        //pour tous a, b, c appartenant à C, log b(a) = log c(a) / log c(b) 
    }

    /**
     * Prend le logarithme en base base d'une Fraction
     * @param {Fraction} fraction La fraction
     * @param {Number} base La base du logarithme
     * @returns {Number} Le résultat du logarithme.
     */
    static logF(fraction, base = 10){
        return Mathemathics.log(fraction.numerateur, base) - Mathemathics.log(fraction.denominateur, base);
    }   //log(a/b) = log(a) - log(b)


    /**
     * La racine n ième de x (opération inverse de x^n) (ex: NthRoot(27, 3) = 3 car 3^3 = 27 ou NthRoot(16, 4) = 2 car 2^4 = 16)
     * @param {Number | Reel | Complexe} x Le nombre sous la racine.
     * @param {Number | Reel} n L'exposant à enlever
     */
    static NthRoot(x, n){
       
        return x**(1/n);
        
    }

    /**
     * La racine carrée complexe de x.
     * @param {Complexe | Reel | Number} x La radicande.
     * @returns {Complexe | Number} Le résultat de l'opération; retourne autant que possible un Number mais si x < 0 || x ∈ C, la fonction retournera un objet Complexe.
     */
    static sqrt(x){
        if(x instanceof abstractNumber){    //c'est un réel
            return Mathemathics.sqrt(x.value);
        }

        if (x instanceof Complexe) {
            return (new Complexe(1, 0)).initExpo(Mathemathics.sqrt(x.module), x.arg/2); //sqrt(re^(iθ)) = e^(iθ/2) * sqrt(r)
            //on ne risque pas de faire une récursivité infinie car le module est réel.
        }
 
        if (x < 0) {   
            return new Complexe(0, Math.sqrt(x));   //sqrt(-1) = 0 + i
        }
        return Math.sqrt(x);
    }

    /**
     * Prend le sinus d'un angle x.
     * @param {Reel | Number | Angle} x 
     * @param {String} unite L'unitée de l'angle
     * @returns {Number}
     */
    static sin(x, unite){
        const y = Mathemathics.prepTrigFunct(x, unite);

        return Math.sin(y);
    }

    /**
     * Prend le cosinus d'un angle x.
     * @param {Reel | Number | Angle} x 
     * @param {String} unite L'unitée de l'angle
     * @returns {Number}
     */
    static cos(x, unite){
        const y = Mathemathics.prepTrigFunct(x, unite);

        return Math.cos(y);
    }

    static tan(x, unite){
        const y = Mathemathics.prepTrigFunct(x, unite);

        return Math.tan(y);
    }

    /**
     * Prépare le nombre/objet x à être entrer dans une fonction de Math. | 
     * exemple: let y = prepTrigFunct(90, "degree"); 
     * Math.sin(y); //== 1
     * @param {Reel | Number | Angle} x 
     * @param {String} unite L'unité de x (les seules unités acceptées sont "radian" et "degree")
     * @returns {Number | null} Retourne le nombre ou null si l'unité n'est pas bonne.
     */
    static prepTrigFunct(x, unite){
        
        if (x instanceof abstractNumber) { 
            x = x.value;
        }else if(x instanceof Angle){
            x = x.convertToRadian().value;
            unite = "radian"
        }

        if (unite == "degree") {
            x = Angle.ConvertToRadian(x)
        }else if(unite != "radian"){
            return null;
        }
        
        return x;
    }

    /**
     * Récupère tous les 2 entiers dans x
     * @param {Number} x Le nombre (Il sera arrondit au plus proche)
     * @returns {Number}
     */
    static get2Factors(x){
        x = Mathemathics.round(x);
        return Math.floor(Math.log2(x));
    }

    /**
     * Récupère le nombre de 10 entiers dans x 
     * @param {Number} x Le nombre (Il sera arrondit au plus proche)
     * @returns {Number}
     */
    static get10Factors(x){
        x = Mathemathics.round(x);
        return Math.floor(Math.log10(x));
    }

    /**
     * Récupère tous les n entiers dans x (si x = n² + 2 alors getNFactors(x, n) = 2)
     * @param {Number} x 
     * @param {Number} n 
     * @returns {Number}
     */
    static getNFactors(x, n){
        return Math.floor(Mathemathics.log(x, n));
    }
    

    /**
     * Décompose un nombre x.
     * @param {Number | Relatif} x Le nombre (entier) à décomposer
     * @returns {Number[]} La liste des facteurs de x, si x n'est pas entier retourne un tableau vide; si x tend vers ∓∞, la fonction retourne undefined.
     */
    static decomposer(x) {         //Fonction adaptée de chatGPT
        if (x instanceof abstractNumber) {
            x = x.value;
        }
        if(Mathemathics.isInf(x)){
            return undefined;
        }


        const neg = (x < 0);
        
        if (x==1 || x==0) {
            return  [x]
        }
        if (x < 0) {
            
            x = abs(x);
        }
        if (!Number.isInteger(x)) {
            return [];
        }

        const factors = [];
        
        //Récupère la puissance de 2
        const fact2 = Mathemathics.get2Factors(x);
        for (let i = 0; i < fact2; i++) {
            factors.push(2);
        }
        
        
        //récupère les autres facteurs (sqrt(x) étant le plus grand facteur entier)
        const sqrtx = Math.sqrt(x);
        for (let i = 3; i <= sqrtx; i += 2) {
          while (x % i === 0) {
            factors.push(i);
            x /= i;
          }
        }
        
        //récupère le facteur restant (si il y en a)
        if (x > 2) {
          factors.push(x);
        }

        if (neg) {
            factors.push(-1);
        }
        
        return factors;
    }

    /**
     * @param  {...Number} x Les nombres à additionner
     * @returns {Number} La somme des x
     */
    static sumParam(...x) {
        if(x.find(Number.POSITIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.POSITIVE_INFINITY;
        }

        if(x.find(Number.NEGATIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.NEGATIVE_INFINITY;
        }

        let somme = 0; 
        x.forEach(xn => {
            somme += xn
        });

        return somme;
    }

    /**
     * Fait la somme de tout les éléments du tableau x
     * @param {Number[]} x 
     * @returns {Number} le résultat
     */
    static sumTab(x){
        if(x.find(Number.POSITIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.POSITIVE_INFINITY;
        }

        if(x.find(Number.NEGATIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.NEGATIVE_INFINITY;
        }

        let somme = 0; 
        x.forEach(xn => {
            somme += xn
        });

        return somme;
    }

    /**
     * Multiplie tous les x.
     * @param  {...Number} x Les nombres à multiplier
     * @returns {Number} Le produit de tout les x
     */
    static produitParam(...x){
        if(x.find(Number.POSITIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.POSITIVE_INFINITY;
        }

        if(x.find(Number.NEGATIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.NEGATIVE_INFINITY;
        }


        let product = 1;
        x.forEach(xn => {
            product *= xn
        });

        return product;
    }

    /**
     * Multiplie les éléments de x.
     * @param {Number[]} x Les nombres à multiplier
     * @returns {Number} Le produit de tout les x
    */ 
    static produitTab(x){
        if(x.find(Number.POSITIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.POSITIVE_INFINITY;
        }

        if(x.find(Number.NEGATIVE_INFINITY) != undefined){  //si il trouve +inf dans le tableau
            return Number.NEGATIVE_INFINITY;
        }

        let product = 1;
        x.forEach(xn => {
            product *= xn
        });

        return product;
    }

    /**
     * Calcule la factorielle de n SANS la fonction Gamma
     * @param {Int} n
     * @returns {Number} La factorielle du nombre
     */
    static factorial(n){
        if (n==0) {
            return 1;
        }
        if(n==Number.NEGATIVE_INFINITY){
            return undefined;
        }

        if(n==Number.POSITIVE_INFINITY){
            return Number.POSITIVE_INFINITY;
        }

        for (let m = 1; m <= n; m++) {
             n *= m;
        }
        return n;
    }

     /**
     * Coupe le nombre à sa accuracy-ième décimale.  (ex: truncFloat(Math.PI) = 3.141)
     * @param {Number} x Le nombre de base.
     * @param {Number} accuracy = 3 | La décimale où il faut couper.
     * @returns {Number}
     */
     static truncFloat(x, accuracy = 3){
        if (accuracy == Number.POSITIVE_INFINITY) {
            return x;         //Le résultat sera x avec le maximum de décimales qu'il puisse avoir donc lui-même
        }

        if (accuracy == Number.NEGATIVE_INFINITY) {
            return 0;       //on considère que dans ce cas le résultat est négligeable (v. le prochain commentaire)
        }

        x *= 10**accuracy;      //comme la ligne à gauche existe, on peut calculer x avec accuracy tendant vers -inf , ce qui donne 0
        x = Math.trunc(x);
        x /= 10**accuracy;

        return x;
    }

    /**
     * Arrondis le nombre à sa accuracy-ième décimale.  (ex: Math.E ≈ 2.718;  round(Math.E, 2) = 2.72)
     * @param {Number} x Le nombre de base.
     * @param {Number} accuracy = 3 | La décimale où il faut arrondir.
     * @returns {Number}
     */
    static round(x, accuracy = 3){
            if (accuracy == Number.POSITIVE_INFINITY) {
                return x;         //Le résultat sera x avec le maximum de décimales qu'il puisse avoir donc lui-même
            }
    
            if (accuracy == Number.NEGATIVE_INFINITY) {
                return 0;       //on considère que dans ce cas le résultat est négligeable (v. le prochain commentaire)
            }
            //comme la ligne en bas existe, on peut calculer x avec des limites, ce qui donne 0
            
            x *= 10**accuracy;   
            x = Math.round(x);
            x /= 10**accuracy;
    
            return x;
    }

    
}

//export {Mathemathics}