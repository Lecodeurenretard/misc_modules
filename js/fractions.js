//import { Mathemathics } from "fonctionsMath.js";


class Fraction{
    #numerateur = 1;
    get #denominateur(){
        return this.#denominateur;
    }
    /**
     * set le dénominateur
     * @param {Number} int Le nombre à assigner, int est arrondit avec Math.round()
     */
    set #denominateur(int){
        int = Math.round(int);  //une fraction doit avoir des thermes entiers
        if(int != 0){
            this.#denominateur = int;
        }else{
            throw "Erreur, dénominateur à essayé d'être mis à 0"
        }
    }
    
    
    /**
     * Retourne la fraction numerateur/denominateur, utiliser Fraction.ToFraction() pour une fraction égale à a.
     * @param {Int} numerateur Le haut de la fraction, la dividende
     * @param {Int} denominateur Le bas, le diviseur
     */
    constructor(numerateur, denominateur){
        if (denominateur == 0) {
            throw "Division par 0, le dénominateur d'un objet Fraction a tenté d'être mis à 0."
        }

        if (numerateur < 0 && denominateur <  0) {
            numerateur = Math.abs(numerateur);
            numerateur = Math.abs(denominateur);
        
        }else if(denominateur < 0){
            numerateur = -numerateur;   //on standardise en mettant le négatif au numerateur.
            denominateur = -denominateur;
        }

        this.#numerateur = numerateur;
        this.denominateur = denominateur;
    }
    
    /**
     * La version in-object de @see Fraction.simplifier
     * @param {Boolean} set Si la fraction doit aussi se set à la fraction simplifiée
     * @returns {Fraction} la fraction simplifiée
     */
    simplifier(set = true){
        const f = Fraction.simplifier(this);
        
        if (set) {
            this.#numerateur = f.#numerateur;
            this.denominateur = f.#denominateur;
        }
        return f;
    }

    /*
     * 
     * @param {*} fraction 
     */
    /*set(fraction){

    }*/

    /**
     * Simplifie un objet fraction (enlève les dénominateurs communs)
     * @param {Fraction} fraction La fraction à simplifier
     * @returns {Fraction} La même fraction simplifiée
     */
    static simplifier(fraction){
        const factNum = Mathemathics.decomposer(fraction.#numerateur),
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

        const num = Mathemathics.produit(factNumFinal),
            deno = Mathemathics.produit(factDenoFinal);
        
        return new Fraction(num, deno);
    }

    /**
     * Retourne une fraction de la forme ab/b
     * @param {Number} a Le numérateur (est arrondit au plus proche)
     * @param {Number} b Le dénominateur (est arrondit au plus proche)
     * @returns {Fraction}  La fraction tel que a = c/b  
     */
    static ToFraction(a, b = 1){
        a = Math.round(a),
            b = Math.round(b);
        
        return new Fraction(a*b, b);
    }

    /**
     * Retourne la valeur décimale de la fraction
     * @param {Fraction} fraction 
     * @returns {Fraction} La valeur décimale de fraction.
     */
    static ToNumber(fraction){
        return fraction.#numerateur / fraction.denominateur;
    }

    /**
     * Multiplie deux fractions
     * @param {Fraction} f1 
     * @param {Fraction} f2 
     * @returns {Fraction}
     */
    static multiply(f1, f2){
        const num = f1.#numerateur * f2.#numerateur,
            deno = f1.denominateur * f2.denominateur;
        
            return new Fraction(num, deno);
    }

    /**
     * Multiplie la fraction avec un autre nombre
     * @param {Fraction} f La fraction
     * @param {Number} x  le nombre
     * @returns {Fraction} Le résultat du produit
     */
    static multiplyNumber(f, x){
        return new Fraction(f.#numerateur*x,  f.#denominateur);
    }

    /**
     * La version in-object de Fraction.multiplyNumber()
     * @param {Number} x le nombre à multiplier avec la fraction.
     * @param {Boolean} set Si la fraction doit se régler au résultat
     * @returns {Fraction} Le résultat de l'opération.
     */
    multiplyNumber(x, set=true){
        const num = x * this.#numerateur;
        if (set) {
            this.#numerateur = num;
        }
        return new Fraction(num, this.#denominateur);
    }
    
    /** 
     * Ajoute deux fractions
     * @param {Fraction} f1 
     * @param {Fraction} f2
     * @returns {Fraction} 
    */
    static add(f1, f2){
        f1.#denominateur
    }

}
//export {Fraction};