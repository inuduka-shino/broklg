/* clientSaver.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define(() => {
  const
    dbName = 'broklgDB',
    tnSetting = 'setting',
    tnBooklog = 'booklog',
    osnNames = [tnSetting, tnBooklog],
    remakeOsnList = [tnBooklog],
    dbSchema = {
      version: 5,
      schema: {
        [tnSetting]: {
          keyPath: 'keyName'
        },
        [tnBooklog]: {
          keyPath: 'asin'
        },
      } ,
      // developMode: true,
      createObjectStore(db, osnName) {
        console.log(`create indexedDB objectStore[${osnName}] for ver ${dbSchema.version}`);
        db.createObjectStore(
          osnName,
          dbSchema.schema[osnName]
        );
      },
      translateObjectStore(db, osnName) {
        if (remakeOsnList.includes(osnName)) {
          // 存在が前提
          console.log(`delete indexedDB objectStore[${osnName}] for ver ${dbSchema.version}`);
          db.deleteObjectStore(osnName);
          dbSchema.createObjectStore(db, osnName);
        }
      }
  };

  function dbOpen(version) {

    return new Promise((resolve, reject) =>{
      try {
        const req = window.indexedDB.open(dbName, version);

        req.onupgradeneeded = () =>{
          const db = req.result;

          osnNames.forEach((osnName)=>{
            if (db.objectStoreNames.contains(osnName)) {
              dbSchema.translateObjectStore(db, osnName);
            } else {
              dbSchema.createObjectStore(db, osnName);
            }
          });
        };
        req.onsuccess = () => {
            const db = req.result;

            db.onerror=(errEvent) => {
              console.log(`db error : ${errEvent.target.errorCode}`);
            };
            resolve(db);
        };
        req.oncomplite = () => {
          console.log('db onsuccess');
        };
        req.onerror = () => {
            reject(new Error(`indexedDB open error. \n${req.error}`));
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  async function save(osnName, key, value=null) {
    const db = await dbOpen(dbSchema.version);
    const tx = db.transaction(osnNames, 'readwrite'),
          store = tx.objectStore(osnName);
    let saveObj = null;
    if (value === null) {
      // aloww save(osnName, value) pattern
      saveObj = key;
    } else {
      saveObj = {
        [dbSchema.schema[osnName].keyPath]: key,
        value
      };
    }
    const req = store.put(saveObj);
    tx.oncomplite = () => {
      console.log('indexedDB save trans complite');
    };

    await new Promise((resolve, reject)=>{
      req.onsuccess = () =>{
        db.close();
        resolve();
      };
      req.onerror = (err) => {
        console.log(err);
        reject(err);
      };
    });
  }

  async function load(osnName, key) {
    const db = await dbOpen(dbSchema.version);
    const tx = db.transaction(osnNames, 'readwrite'),
          store = tx.objectStore(osnName);
    const req = store.get(key);
    const ret = await new Promise((resolve, reject)=>{
      req.onsuccess = () =>{
        db.close();
        if (typeof req.result === 'undefined') {
          resolve(null);
        } else {
          resolve(req.result.value);
        }
      };
      req.onerror = (err) => {
        console.log(err);
        reject(err);
      };
    });
    return ret;
  }

function generate() {
    return {
      saveSetting: save.bind(null, tnSetting),
      loadSetting: load.bind(null, tnSetting),
      saveBooklog: save.bind(null, tnBooklog),
      loadBooklog: load.bind(null, tnBooklog),
    };
  }

  return {
    generate
  };
});
