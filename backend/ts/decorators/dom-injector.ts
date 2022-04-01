

function domInjector(seletor: string) {

    return function(target: any, propertyKey: string) {

        const getter = function() {
             
            const elemento = document.querySelector(seletor) as HTMLElement;
            
            if(!elemento) {
                throw new Error(`${propertyKey} queria receber elemento de selector ${seletor}, que não foi encontrado`);
            }


            Object.defineProperty(this, propertyKey, 
                {  value: elemento
                });

            return elemento;
        }

        Object.defineProperty(target, propertyKey, {
            get: getter
        });

        

    }
}


export default domInjector;