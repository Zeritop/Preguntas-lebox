const usuarios = [
    { id: 1, nombre: 'Jose Cartes', telefono: 11111, edad: 25 },
    { id: 2, nombre: 'Pedro Gomez', telefono: 22222, edad: 44 },
    { id: 3, nombre: 'Maria Lara', telefono: 33333, edad: 79 },
    { id: 4, nombre: 'David Perez', telefono: 44444, edad: 12 },
    { id: 5, nombre: 'Camilo Silva', telefono: 55555, edad: 51 },
    { id: 6, nombre: 'Javiera Alarcon', telefono: 66666, edad: 64 }
]

const atenciones = [
    { id: 1, fecha: '25-06-2020', id_usuario: 2 },
    { id: 2, fecha: '12-03-2018', id_usuario: 6 },
    { id: 3, fecha: '09-10-2014', id_usuario: 2 },
    { id: 4, fecha: '30-01-2010', id_usuario: 1 },
    { id: 5, fecha: '15-12-2018', id_usuario: 4 },
    { id: 6, fecha: '20-07-2019', id_usuario: 5 },
    { id: 7, fecha: '12-12-2021', id_usuario: 3 },
    { id: 8, fecha: '12-01-2022', id_usuario: 3 },
    { id: 9, fecha: '12-01-2011', id_usuario: 1 },
    { id: 10, fecha: '18-09-2018', id_usuario: 2 },
    { id: 11, fecha: '01-06-2022', id_usuario: 3 }
]
// ejercicio 1
console.log('PREGUNTA 1')
// Recorro el array usuarios y obtengo el nombre y la edad y lo guardo en la varible 'userDescByEdad'
const userDescByEdad = usuarios.map(usuario => {
  const { nombre, edad } = usuario
  return {
    nombre, 
    edad
  }
}).sort((a, b) => b.edad - a.edad) // Ordeno de forma descendiente a los usuarios por edad
// Recorro y muestro por consol solo el nombre de los usuarios
console.log(userDescByEdad.map(u => u.nombre)) 
console.log('-----------Fin pregunta 1------------');
console.log('')
// ejercicio 2
console.log('PREGUNTA 2')
// Recorro el array usuarios y dentro recorro el array atenciones y el resultado se guarda en la variable 'cantAtencion'
const cantAtencion = usuarios.map(usuario => {
    // obtengo el nombre del usuario a comparar con el array atenciones y su id
    const { nombre, id } = usuario
    // inicializo una variable para contar el numero de atenciones
    let valor = 0
    // Recorriendo array atenciones
    atenciones.forEach(a => {
        // Pregunto si el usuario coincide con el registro de atenciones de ser asi
        // Se le suma 1 a la variable
      if(id === a.id_usuario){
        valor += 1;
      }
    })
    // se retorna nombre y cantidad de atenciones
    return{
      nombre,
      valor
    }
  }).sort((a, b) => b.valor - a.valor) // ordeno el array en forma decreciente por cant de atenciones
  
  // creo una variable para obtener solamente la cantidad de atenciones de todos los usuarios
  const atenc = cantAtencion.map(c => c.valor)

  // Obtengo el numero mayor de cantidad de atenciones
  const mayorAtenc = Math.max(...atenc)

  console.log('Mayor cantidad de atenciones:', mayorAtenc);
  console.log('-----------Fin pregunta 2------------');
  console.log('')


    // ejericio 3
  console.log('PREGUNTA 3')
  // Obtengo a el/los usuario(s) que tengan la cantidad obtenida anteriormente
  const usersAtenciones = cantAtencion.filter(a => a.valor === mayorAtenc)

  // Muestro a el/los usuarios que tiene(n) más atenciones
  console.log('El/los usuario(s) con mayor cantidad de atenciones:');

  console.log(usersAtenciones.map(usuario => usuario.nombre));
  
  console.log('-----------Fin pregunta 3------------');
  console.log('')

  // ejercicio 4
console.log('PREGUNTA 4')
 // Creo una variable 'telefonoUsers' para almacenar los telefonos y las veces de atencion por año
  const telefonoUsers = usuarios.map(usuario => {
    // Obtengo las variables id y telefono de cada usuario
    const { id, telefono } = usuario
    // Creo un array vacio, un objeto vacio, y una variable con valor inicial 0
    const arrayConFechas = []
    let vecesPorAno = {}
    let valor = 0
    // Recorro las atenciones por cada usuario
    atenciones.forEach(atencion => {
      // Si el id del usuario coincide con el de la atencion guardo la fecha
      // y la separo para luego obtener solo el año
      if(id === atencion.id_usuario){
        fecha = atencion.fecha
        fechaSeparada = fecha.split('-')
        ano = fechaSeparada[2]
        arrayConFechas.push(ano) // la fecha la guardo en el array creado previamente
      }
    })
    // Hago un ciclo for para recorrer el array que guarda las fechas de los usuarios
    for(let i=0; i<arrayConFechas.length; i++){
      // Hago un filtro para guardar la(s) mismas fecha(s) de la posicion actual
      // en la variable 'veces' -> [2020, 2020]
      veces = arrayConFechas.filter(arrayFecha => arrayFecha === arrayConFechas[i])
      if(veces.length > 1){
        // Si al guardar las fechas el tamaño del array es mayor a 1, aumento en 1 la variable 'valor'
        // Si el array es mayor a 1 significa que el usuario se atendio mas de una vez en ese año
        // EJEMPLO: veces['2020'] -> solo se atendio una vez por lo tanto no se suma
        // EJEMPLO: veces['2021', '2021'] -> la longitud del array es mayor a 1 por lo tanto se atendio mas de una vez y se suma
        valor += 1
      }
      // Se empieza a crear el objeto creado previamente 'vecesPorAno'
      // Si no existe la llave a guardar, se crea y se le añade el valor que tenga la variable 'valor'
      if(!vecesPorAno.hasOwnProperty(arrayConFechas[i])){
        vecesPorAno[arrayConFechas[i]] = valor
      }
      // Se vuelve a asignar la variable 'valor' por si esta a sufrido algun cambio en el campo correspondiente
      vecesPorAno[arrayConFechas[i]] = valor
    }
    
    return{
      telefono,
      vecesPorAno
    }
  })
  // Recorro la variable 'telefonoUsers' para mostrar el telefono del usuario que se atendio mas de una vez el mismo año
  console.log(telefonoUsers.map(telefono => {
    //Pregunto si en el objeto axiste algun valor mayor a 0
    if(Object.values(telefono.vecesPorAno).some(veces => veces > 0)){
        return telefono.telefono // se retorna el telefono del usuario con valor mayor a 0
    }
  }).filter(telefono => telefono !== undefined)) // En caso de no haber telefono devuelve 'undefined' entonces hago un filtro
  // para solo mostrar los telefonos que corresponden

  // Aclaracion ciclo For
  // Agrupo la cantidad de atencion por año si es solo 1 se guarda un 0
  // En caso de ser mas se guardan las veces que se atendio ese año
  // En el siguiente ejemplo en el año 2023 se atendio 2 veces y en los demas solo 1
  // { telefono: 123456, vecesPorAno: {2021: 0, 2022: 0, 2023: 2} }
  console.log('-----------Fin pregunta 4------------');
  console.log('')

  // Ejercicio 5
  console.log('PREGUNTA 5')
  // Recorro el array usuarios y el resultado lo guardo en 'idUsersFechas'
  const idUsersFechas = usuarios.map(usuario => {
    // Obtengo el id de los usuarios
    // y creo un array vacio
    const { id } = usuario
    const arrayUsers = []
    // recorro las atenciones por cada usuario
    atenciones.map(atencion => {
      const fechaUsers = {} // creo un objeto vacio
      // Si el id del usuario coincide con el id registrado en la atencion obtengo la fecha de ese usuario
      // y la separo por dia, mes y año
      if(id === atencion.id_usuario){
        fecha = atencion.fecha
        fechaSeparada = fecha.split('-')
        dia = fechaSeparada[0]
        mes = fechaSeparada[1]
        ano = fechaSeparada[2]
        // Una vez separa lo agrego al objeto 'fechaUsers' creado anteriormente
        fechaUsers.id = id
        fechaUsers.dia = dia
        fechaUsers.mes = mes
        fechaUsers.ano = ano
        arrayUsers.push(fechaUsers) // y lo agrego al array creado al inicio
      }
    })

    return arrayUsers // retorno el array
  })
  // Recorro la variable indicada anteriormente 'idUsersFechas' con la finalidad de ordenar los registros por fecha
  // Una vez ordenados saco el primer elemento (que seria la primera atencion del usuario) y lo guardo en 'primerasFechas'
  // una vez guardado en 'primerasFechas' lo vuelvo a ordenar para así obtener a los usuarios ordenados por la primera fecha de atencion de cada uno
  const idSortByDate = idUsersFechas.map(userFecha => {
    const primerasFechas = userFecha.sort((a,b) => a.dia - b.dia).sort((a, b) => a.mes - b.mes).sort((a, b) => a.ano - b.ano).shift()
    
    return primerasFechas
  }).sort((a,b) => a.dia - b.dia).sort((a, b) => a.mes - b.mes).sort((a, b) => a.ano - b.ano)
 
  console.log(idSortByDate.map(sortDate => sortDate.id)) // Finalmente recorro los datos de las primeras atenciones de los usuarios y muestro solo los ids 
  console.log('-----------Fin pregunta 5------------');