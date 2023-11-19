//import { Mathemathics } from "fonctionsMath.js";
//import { Relatif, Naturel } from "nombres.js"

/**
 * Représente une fraction.
 */
class Fraction{
    numerateur = 1;
    /**
     * Retourne la fraction numerateur/denominateur, utiliser Fraction.ToFraction() pour une fraction égale à a.
     * @param {Number | Relatif} numerateur Le haut de la fraction, la dividende
     * @param {Number | Relatif} denominateur Le bas, le diviseur != 0
     */
    constructor(numerateur, denominateur){
        if(numerateur instanceof Relatif || numerateur instanceof Naturel){ numerateur = numerateur.value; }
        else if((!Number.isInteger(numerateur) && Reel.isPartOfThis(numerateur)) || numerateur instanceof Complexe){ throw new WrongEnsembleError('La fonction n\'admet pas les nombres non entiers'); }

        if(denominateur instanceof Relatif || denominateur instanceof Naturel){ denominateur = denominateur.value; }
        else if((!Number.isInteger(denominateur) && Reel.isPartOfThis(denominateur)) || denominateur instanceof Complexe){ throw new WrongEnsembleError('La fonction n\'admet pas les nombres non entiers'); }
        
        if (denominateur == 0) {
            throw new OperationError("Division by 0");
        }

        if(denominateur < 0){
            numerateur = -numerateur;   //on met le négatif au numerateur.
            denominateur = -denominateur;
        }

        this.numerateur = numerateur;
        this.denominateur = denominateur;
    }
    
    /**
     * Simplifie la fraction et change les fields de l'objet, pour ne pas changer l'objet utiliser @see Fraction.simplifier
     * @returns {Fraction} la fraction simplifiée
     */
    simplifier(){
        const f = Fraction.simplifier(this);
        
        
        this.numerateur = f.numerateur;
        this.denominateur = f.denominateur;
        
        return f;
    }
    

    /**
     * Simplifie un objet fraction (enlève les dénominateurs communs)
     * @param {Fraction} fraction La fraction à simplifier
     * @returns {Fraction} La même fraction simplifiée
     */
    static simplifier(fraction){
        const factNum = Mathemathics.decomposer(fraction.numerateur),
            factDeno = Mathemathics.decomposer(fraction.denominateur),
            factNumFinal = [1],
            factDenoFinal = [1];
        
        //ajoute les facteurs 
        factDeno.forEach(facteur => {
            if(!factNum.includes(facteur)){
                factDenoFinal.push(facteur)
            }
        });

        factNum.forEach(facteur => {
            if(!factDeno.includes(facteur)){
                factNumFinal.push(facteur)
            }
        });

        const num = Mathemathics.produitTab(factNumFinal),
            deno = Mathemathics.produitTab(factDenoFinal);
        
        return new Fraction(num, deno);
    }

    /**
     * Retourne une fraction de la forme ab/b
     * @param {Number | Reel} a Le numérateur (est arrondit au plus proche)
     * @param {Number | Reel} b Le dénominateur (est arrondit au plus proche)
     * @returns {Fraction}  La fraction tel que a = c/b  
     */
    static ToFraction(a, b = 1){
        a = Mathemathics.round(a),
            b = Mathemathics.round(b);
        
        return new Fraction(a*b, b);
    }

    /**
     * Retourne la valeur décimale de la fraction
     * @param {Fraction} fraction 
     * @returns {Number} La valeur décimale de fraction.
     */
    static ToNumber(fraction){
        return fraction.numerateur / fraction.denominateur;
    }
    
    /**
     * Retourne la valeur décimale de la fraction
     * @returns {Number} La valeur décimale de fraction.
     */
    ToNumber(){
        return this.numerateur / this.denominateur;
    }

    /**
     * Multiplie deux fractions
     * @param {Fraction} f1 
     * @param {Fraction} f2 
     * @returns {Fraction}
     */
    static multiply(f1, f2){
        const num = f1.numerateur * f2.numerateur,
            deno = f1.denominateur * f2.denominateur;
        
        return new Fraction(num, deno);
    }

    /**
     * La version in-object de Fraction.multiply(). Multiplie deux Fractions.
     * @param {Fraction} f La fraction à multiplier à this.
     * @param {Boolean} set Si la fraction doit être mise à ce qu'elle retourne.
     * @returns {Fraction} Le produit de this et de f.
     */
    multiply(f, set = true){
        const fFinal = Fraction.multiply(this, f);
        if (set) {
            this.numerateur = fFinal.numerateur;
            this.denominateur = fFinal.denominateur;
        }
        return fFinal;
    }

    /**
     * Multiplie les deux membres de la fraction tel que pour toute Fraction f = a/b: f = f.multiplyEqual(c) = ac/bc
     * @param {Number | Reel} x Un nombre, il sera arrondit
     * @param {Boolean} set Si true,  met la fraction de laquelle la méthode est appelée à ce qu'elle retourne.
     * @returns {Fraction} La fraction avec x de multiplié sur chaque membre
     */

    multiplyEqual(x, set  = false){
        if(x instanceof abstractNumber){ x = x.value; }
       
        x = Math.round(x);
        const num = x * this.numerateur,
            deno = x * this.denominateur;

        if (set) {
            this.numerateur = num;
            this.denominateur = deno;
        }
        return new Fraction(num, deno);
    }

    /**
     * Ajoute f à la fraction de sorte à ce que la fraction soit toujour égale à elle-même
     * @param {Fraction} f Une fraction égale à this, si ça ne l'est pas, on fera this + (this*2/2);
     * @returns {Fraction | undefined} Renvoie undefined si f n'est pas une fraction.
     */
    addEquals(f){
        if (!(f instanceof Fraction)) {return undefined}
        if (!Fraction.equals(this, f)) {f = new Fraction(this.numerateur*2, this.denominateur*2);}

        return Fraction.add(this, f);
    }

    /**
     * Multiplie la fraction avec un autre nombre
     * @param {Fraction} f La fraction
     * @param {Number} x  le nombre
     * @returns {Fraction} Le résultat du produit
     */
    static multiplyNumber(f, x){
        return new Fraction(f.numerateur*x,  f.denominateur);
    }

    /**
     * La version in-object de Fraction.multiplyNumber()
     * @param {Number | Reel} x le nombre à multiplier avec la fraction.
     * @param {Boolean} set Si la fraction doit se régler au résultat
     * @returns {Fraction} Le résultat de l'opération.
     */
    multiplyNumber(x, set=true){
        if (x instanceof abstractNumber) {x = x.value;}

        const num = x * this.numerateur;
        if (set) {
            this.numerateur = num;
        }
        return new Fraction(num, this.denominateur);
    }
    
    /** 
     * Ajoute deux fractions
     * @param {Fraction} f1 
     * @param {Fraction} f2
     * @returns {Fraction} 
    */
    static add(f1, f2){
        const add = Fraction.setOnSameDeno(f1, f2);

        return Fraction(add[0].numerateur + add[1].numerateur, add[1].denominateur);
    }

    /**
     * Met les deux fractions sur le même dénominateur.
     * @param {Fraction} f1 La 1ere fraction
     * @param {Fraction} f2 La 2e fraction
     * @returns {Fraction[]} Les deux fractions sur le même dénominateur. [0] correspond à f1 et [1] correspond à f2.
     */
    static setOnSameDeno(f1, f2){
        const f1deno = f1.denominateur,
            f2deno = f2.denominateur,
            F1 = f1.multiplyEqual(f2deno),    //on met les deux fractions à 
            F2 = f2.multiplyEqual(f1deno);

        return [F1, F2];
    }

    /**
     * La version in-object de Fraction.setOnSameDeno(). Met la Fraction courante et f sur le même dénominateur.
     * @param {Fraction} f La deuxième fraction.
     * @param {Boolean} set=true | Si la Fraction courante doit être set à son équivalent.     
     * @returns {Fraction[]} Les deux fractions sous la forme d'une liste.
     */
    setOnSameDeno(f, set = true){
        const FList = Fraction.setOnSameDeno(this, f);
        if (set) {
            this.numerateur = FList[0].numerateur;
            this.denominateur = FList[0].denominateur;
        }
        return FList;
    }

    /**
     * Change le dénominateur de la Fraction, tel que pour toute Fraction f, et entier m, f = f.changeDeno(m)
     * @param {Number | Reel} n Le dénominateur, Il sera arrondit au plus proche (unité près)
     * @param {Boolean} set=false | Si la Fraction doit se set à ce qu'elle retourne.
     * @param {Boolean} notInterger=false | Permet au dénominateur d'être arrondis par le constructeur de Fraction.
     * @returns {Fraction} La Fraction sous un dénominateur n. Si la fraction n'a pas de dénominateur entier, retourne this.
     */
    changeDeno(n, set = false, notInterger = false){
        if(n instanceof Relatif || n instanceof Naturel){ n = n.value; }
        if((!Number.isInteger(n) && Reel.isPartOfThis(n)) || n instanceof Complexe){ throw new WrongEnsembleError('Le dénominateur doit être entier'); }
        
        const newNum = this.numerateur * n/this.denominateur; //règle de trois,produit en croix, ...
        
        if (!Number.isInteger(newNum) && !notInterger) {
            return this;
        }
        return new Fraction(newNum, n);
    }

    /**
     * Compare deux fractions
     * @param {Fraction} f1 1ere fraction
     * @param {Fraction} f2 2e fraction
     * @returns {Boolean} Si les deux fractions sont égales
     */
    static equals(f1, f2){
        const F1 = f1.ToNumber(),
            F2 = f2.ToNumber();

        return (F1 == F2);
    }

    /**
     * Compare deux fractions strictement (Prend en compte les thermes indépendament: 1/3 != 3/9)
     * @param {Fraction} f1 
     * @param {Fraction} f2 
     * @returns {Boolean} Si les deux fractions sont strictement égales
     */
    static strictEquals(f1, f2){
        return (f1.numerateur == f2.numerateur && f1.denominateur == f2.denominateur);
    }

    /**
     * Compare deux fractions
     * @param {Fraction} f1 1ere fraction
     * @param {Fraction} f2 2e fraction
     * @returns {Boolean} Si f1 > f2
     */
    static greater(f1, f2){
        const F1 = f1.ToNumber(),
            F2 = f2.ToNumber();

        return (F1 > F2);s
    }
}
//export {Fraction};