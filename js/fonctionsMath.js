//import { Fraction } from "fractions.js";
//import { Naturel, Relatif, Reel, Complexe, Angle } from "nombres.js"

/**
 * Une interface contenant des fonctions relatives aux Mathématiques.
 * Est compatible avec Les classes de nombre.js
 */
class Mathemathics{
    static PHI = (1 + Math.sqrt(5))/2;      //le nombre d'or

    /**
     * @param {Number} x Le nombre à tester
     * @returns {Boolean} Si x == +|- infini
     */
    static isInf(x){
        return (x==Number.NEGATIVE_INFINITY || x==Number.POSITIVE_INFINITY);
    }

    /**
     * Vérifie si x est premier (n'ayant que 1 et lui-même pour diviseur dans Z) 
     * @param {Number | Relatif} x  Le nombre à tester, doit être < 3721.
     * @returns {Boolean | undefined} Si le nombre est premier, retourne null si x > 3721
     */

    static isPremier(x){
        if (x instanceof Naturel || x instanceof Relatif) {x = x.value;}
        else if (x instanceof abstractNumber || x instanceof Complexe || !Number.isInteger(x)) {
            throw new WrongEnsembleError();
        }

        
        if (x <= 1 || x == 3721) {        //tous les entiers ≤ 1 sont soit multiple de -1, soit 1, soit 0 => non premiers. Et 3721 = 61²
            return false;
        }

        if (x > 3721) { //la liste permet de trouver seulement jusqu'à là
            return undefined;
        }

        numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
        if (numbers.includes(x) || x == 61) {return true;}
        numbers.forEach(premier => {
            if ((numbers % premier) == 0) {
                return false;
            }
        });
        return true;
    }

    /**
     * Vérifie si x est entier
     * @param {Number | Reel} x Le nombre à tester 
     * @returns {Boolean} Si le nombre est entier
     */
    static isEntier(x){
        if (x instanceof abstractNumber) {x = x.value;}
        if (x instanceof Complexe) {return false;}
        
        return Number.isInteger(x);
    }

    /**
     * Logarithme en base base de a (R+ -> R)
     * @param {Number | Reel} x Le paramètre du logarithme
     * @param {Number | Reel} base=10 | La base du logaritme
     * @returns {Number} Le logarithme en base base de a
     */
    static log(x, base = 10){
        if (x instanceof abstractNumber) {x = x.value;}
        if (base instanceof abstractNumber) {base = base.value;}
        
        if (x instanceof Complexe || base instanceof Complexe) {throw new WrongEnsembleError("Cette fonction ne supporte pas les complexes");}
        if (x < 0 || base < 0) {throw new OperationError("La fonction ne prend pas en compte les négatifs.");}

        const lnx = Math.log(x),        //Math.log(x) <=> ln x
            lnBase  = Math.log(base);
        
        return lnx/lnBase;      
        //pour tous a, b, c appartenant à C, log b(a) = log c(a) / log c(b) 
    }

    /**
     * Prend le logarithme en base base d'une Fraction
     * @param {Fraction} fraction La fraction
     * @param {Number} base=10 | La base du logarithme
     * @returns {Number} Le résultat du logarithme.
     */
    static logF(fraction, base = 10){
        if (base < 0) {throw new OperationError("La base ne peut être négative.");}

        return Mathemathics.log(fraction.numerateur, base) - Mathemathics.log(fraction.denominateur, base);
    }   //log(a/b) = log(a) - log(b)


    /**
     * La racine n ième de x (opération inverse de x^n) 
     * (ex: NthRoot(27, 3) = 3 car 3^3 = 27 ou NthRoot(16, 4) = 2 car 2^4 = 16)
     * @param {Number | Reel } x Le nombre sous la racine.
     * @param {Number | Reel} n L'exposant à enlever
     */
    static realNthRoot(x, n){
        if (x instanceof abstractNumber) {x = x.value;}
        if (n instanceof abstractNumber) {n = n.value;}

        if (x instanceof Complexe || n instanceof Complexe) {throw new WrongEnsembleError("La fonction ne prend pas en charge les complexes");}
        if (x < 0 && n%2 == 0) {throw new OperationError("Ne peut prendre des racines complexes.")}

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
     * Prend le sinus reel d'un angle x.
     * @param {Reel | Number | Angle} x 
     * @param {String} unite L'unitée de l'angle
     * @returns {Number}
     */
    static sin(x, unite){
        if (x instanceof Complexe) {throw new WrongEnsembleError("L'ensemble des complexes n'est pas admis.");}

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
        if (x instanceof Complexe) {throw new WrongEnsembleError("L'ensemble des complexes n'est pas admis.");}
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
        if (x instanceof Complexe) {throw new WrongEnsembleError()}

        x = Mathemathics.round(x);
        return Math.floor(Math.log2(x));
    }

    /**
     * Récupère le nombre de 10 entiers dans x 
     * @param {Number} x Le nombre (Il sera arrondit au plus proche)
     * @returns {Number}
     */
    static get10Factors(x){
        if (x instanceof Complexe) {throw new WrongEnsembleError()}

        x = Mathemathics.round(x);
        return Math.floor(Math.log10(x));
    }

    /**
     * Récupère tous les n entiers dans x (si x = n² + 6 alors getNFactors(x, n) = 2)
     * @param {Number} x 
     * @param {Number} n 
     * @returns {Number}
     */
    static getNFactors(x, n){
        if (x instanceof Complexe || n instanceof Complexe) {throw new WrongEnsembleError()}

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
        if(Mathemathics.isInf(x) || !Number.isInteger(x)){throw new WrongEnsembleError("x is infinite or not integer.")}


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
     * @param  {...Number | ...Reel | ...Complexe} x Les nombres à additionner
     * @returns {Number  | Complexe} La somme des x (complexe si x est complexe)
     */
    static sumParam(...x) {
        if (x.includes(Number.NEGATIVE_INFINITY) && x.includes(Number.POSITIVE_INFINITY)) {throw new LimError("∞-∞");}

        if( x.includes(Number.POSITIVE_INFINITY)){  //si il trouve +∞ dans le tableau
            return Number.POSITIVE_INFINITY;
        }

        if(x.includes(Number.NEGATIVE_INFINITY)){  //si il trouve -∞ dans le tableau
            return Number.NEGATIVE_INFINITY;
        }



        if (x instanceof Complexe) {
            let result = new Complexe(0, 0);

            x.forEach(xn => {
                result.add(xn, true);
            });
            return result
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
        if (x.includes(Number.NEGATIVE_INFINITY) && x.includes(Number.POSITIVE_INFINITY)) {
            throw new LimError("∞-∞");
        }

        if(x.includes(Number.POSITIVE_INFINITY)){  //si il trouve +inf dans le tableau
            return Number.POSITIVE_INFINITY;
        }

        if(x.includes(Number.NEGATIVE_INFINITY)){  //si il trouve +inf dans le tableau
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
        if (x.includes(0) && (x.includes(Number.NEGATIVE_INFINITY) || x.includes(Number.POSITIVE_INFINITY))) {  //0*∞
            throw new LimError("0 * ∞");
        }

        if (x.includes(0)) {return 0;}

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
        if (x.includes(0) && (x.includes(Number.NEGATIVE_INFINITY) || x.includes(Number.POSITIVE_INFINITY))) {  //0*∞
            throw new LimError("0 * ∞");
        }

        if (x.includes(0)) {return 0;}

        let product = 1;
        x.forEach(xn => {
            product *= xn
        });

        return product;
    }

    /**
     * Multiplie
     * @param {Number | Fraction | Reel | Complexe} a Fraction et abstractNumber sont convertits en Number
     * @param {Number | Fraction | Reel | Complexe} b Fraction et abstractNumber sont convertits en Number
     * @returns {Number | Complexe} 
     */
    static globalMultiply(a, b){
        if (a instanceof abstractNumber) {
            a = a.value;
        }else if (a instanceof Fraction) {
           a = a.ToNumber();
        }
       
        if (b instanceof abstractNumber) {
            b = b.value;
        }else if (a instanceof Fraction) {
            b = b.ToNumber();
        }

        if((a == 0 && Mathemathics.isInf(b)) || (b == 0 && Mathemathics.isInf(a))){ //si on fait 0 * inf
            throw new LimError("0 * ∞");
        }

        if (!Number.isNaN(a) && !Number.isNaN(b)) {
            return a * b;
        }

        const za = Complexe.toComplexe(a),
            zb = Complexe.toComplexe(b);
        
        return Complexe.multiply(za, zb);
    }

    /**
     * Calcule la factorielle de n avec la méthode récursive
     * @param {Number | Naturel} n
     * @returns {Number} La factorielle du nombre
     */
    static factorial(n){
        
        if(n==Number.NEGATIVE_INFINITY){return undefined;}
        if(n==Number.POSITIVE_INFINITY){return Number.POSITIVE_INFINITY;}


        if (n instanceof Naturel) {
            n = n.value
        }else if((Reel.isPartOfThis(n) && !Naturel.isPartOfThis(n)) || n instanceof Complexe){throw new WrongEnsembleError("Les factorielles ne sont définies que dans N");}

        if (n==0) {
            return 1;
        }

        let ret = 1;
        for (let m = 1; m <= n; m++) {
             ret *= m;
        }
        return ret;
    }

     /**
     * Coupe le nombre à sa accuracy-ième décimale.  (ex: truncFloat(Math.PI) = 3.141)
     * @param {Number | Reel} x Le nombre de base.
     * @param {Number | Reel} accuracy = 3 | La décimale où il faut couper.
     * @returns {Number}
     */
     static truncFloat(x, accuracy = 3){
        if (x instanceof abstractNumber)        {x = x.value;}
        if (accuracy instanceof abstractNumber) {accuracy = accuracy.value}
        if (x instanceof Complexe || accuracy instanceof Complexe) {throw new WrongEnsembleError()}
        if(!Number.isInteger(accuracy)){throw new WrongEnsembleError("Accuracy n'est pas entier")}

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
     * @param {Number | Reel} x Le nombre de base.
     * @param {Number | Reel} accuracy = 3 | La décimale où il faut arrondir.
     * @returns {Number}
     */
    static round(x, accuracy = 3){
        if (x instanceof abstractNumber){x = x.value;}
        
        if (accuracy instanceof abstractNumber) {accuracy = accuracy.value}
        
        if (x instanceof Complexe || accuracy instanceof Complexe) {throw new WrongEnsembleError()}
        
        
        if(!Number.isInteger(accuracy)){throw new WrongEnsembleError("Accuracy n'est pas entier")}

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


    /**
     * Une fonction puissance (u^x)
     * @param {Complexe | Reel | Number} u La base
     * @param {Reel | Number} x Le nombre en haut.  
     * @returns {Number}
     */
    static expodentielle(u, x){
        if (u instanceof abstractNumber) {u = u.value;}
        if (x instanceof abstractNumber) {x = x.value;}
        if (x instanceof Complexe) {throw new WrongEnsembleError("x est complexe.")}

        if (!Number.isNaN(u)) {
            return u**x;            //si réel
        }

        return Complexe.exponent(u, x); //si complexe
    }
}

class MathError extends Error{
    /**
     * @param {String} message='' | Le message de l'erreur
     * @param {String} cause="Wrong Math" | La cause de l'erreur (ne pas confondre avec option.cause)
     * @param {Object | undefined} options=undefined |  les options à passer au constructeur de Error
     */
    constructor(message = '', cause = 'Wrong math', options = undefined){
        super(message, options);
        this.name = "MathError";
        this.message = message;
        this.cause = cause;
    }

    /**
     * @returns {String}
     */
    toString(){
        if (this.cause == undefined || this.cause == '') {return this.name + ': ' + this.message;}
        if (this.name == undefined || this.name == '')   {return this.message + " |  cause: " + this.cause;}
        if (this.message == '')                          {return this.name + ": (cause: " + this.cause + ')';}

        return this.name + ': ' + this.message + " |  cause: " + this.cause;
    }
}

class WrongEnsembleError extends MathError{
    /**
     * @param {String} message='' | Le message de l'erreur
     * @param {Object | undefined} options=undefined |  les options à passer au constructeur de Error
     */
    constructor(message, options = undefined){
        super(message, "Nombre d'un mauvais ensemble fournit", options);
    
        this.name = "WrongEnsembleError";
    }
}

class OperationError extends MathError{
    /**
     * @param {String} message='' | Le message de l'erreur
     * @param {Object | undefined} options=undefined |  les options à passer au constructeur de Error
     */
    constructor(message, options = undefined){
        super(message, "Opération interdite ou indéfinie dans l'ensemble courant", options);
        this.name = "OperationError";
    }
}

/**
 * Représente une erreur relative aux limite (forme inéterminée par exemple)
 */
class LimError extends MathError{
    constructor(message, options = undefined){
        super(message, "forme indéterminée", option);

        this.name = "LimError";
    }
}

//export {Mathemathics, MathError, OperationError, WrongEnsembleError}