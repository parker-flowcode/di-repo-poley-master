```java
    domain/
        entities/
            clsPista
                +idPista: int(get)
                +tipo: string(get/set)
                +horario: Date(get/set)
            clsDeporte
                +idDeporte: int(get)
                +nombre:string(get/set)
        interfaces/
            repositories
                    IRepositoryPista
                        +getPistas(): Pistas[]
                    IRepositoryDeporte
                        +getDeportes(): Deportes[]
    application
        interfaces/
            pistas/
                IListarPistas
                    +execute(): Pistas[]
                IGetPistaById
                    +execute(id: int): Pista
                IActualizarPista
                    +execute(id: int, idDeporte: int): boolean
            deporte/
        useCases
    presentation/
        viewmodels/
        views/
    data
        repositories 
    core
        container.ts
        types.ts
    
```     
