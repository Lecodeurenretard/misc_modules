class Mathemathics{
    /**
    * Convertit les degrés en radians.
    * @param {Number} angle number L'angle devant être convertit (doit être en degré).
    * @param {Boolean} coef Si true, la fonction ne retournera que le coefficient. On peut donc écrire pour tout a (avec la fonction représentée par f()): f(a) = π*f(a, true)
    * @returns {Number}  L'équivalent en radian.
    */
    static ConvertToRadian(angle, coef=false){
        if (coef) {
            angle *= Math.PI
        }
        return angle/ 180
    }

        /**
        * Convertit les radians en degrés.
        * @param {double} angle number L'angle devant être convertit (doit être en radian).
        * @returns number  L'équivalent en degré.
        */
    static ConvertToDegree(angle){
        return angle * 180 /Math.PI
    }

    /**
     * Vérifie si x est premier (n'ayant que 1 et lui-même pour diviseur dans N) 
     * @param {int} x  Le nombre à tester.
     * @returns {boolean} Si le nombre est premier
     */

    static isPremier(x){
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
     * @param {Number} base La base du logarithme
     * @returns {Number} Le logarithme en base base de a
     */
    static log(x, base){
        const lnx = Math.log(x),        //Math.log(x) = ln x
            lnBase  = Math.log(base);
        
        return lnx/lnBase;      
        //pour tous a, b, c appartenant à C, log b(a) = log c(a)/ log c(b) 
    }

    /**
     * Récupère tous les 2 entiers dans x tel que : 2^get2Factors(x) *k = x
     * @param {Number} x Le nombre (Il sera arrondit au plus proche)
     * @returns {Number}
     */
    static get2Factors(x){
        x = Math.round(x);
        return Math.floor(Math.log2(x));
    }

    /**
     * Récupère tous les 10 entiers dans x tel que : 10^get2Factors(x) *k = x
     * @param {Number} x Le nombre (Il sera arrondit au plus proche)
     * @returns {Number}
     */
    static get10Factors(x){
        x = Math.round(x);
        return Math.floor(Math.log10(x));
    }

    /**
     * Récupère tous les n entiers dans x tel que : n^get2Factors(x) *k = x
     * @param {Number} x 
     * @param {Number} n 
     * @returns {Number}
     */
    static getNFactors(x, n){
        return Math.floor(Mathemathics.log(x, n));
    }
    

    /**
     * Décompose un nombre x.
     * @param {Number} x Le nombre à décomposer
     * @returns {Number[]} La liste des facteurs de x, si x n'est pas entier retourne un tableau vide.
     */
    static decomposer(x) {          //Fonction adaptée de chatGPT
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
    static sum(...x) {
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
        for (let m = 1; m < n; m++) {
             n *= m;
        }
        return m;
    }
}

//export {Mathemathics}