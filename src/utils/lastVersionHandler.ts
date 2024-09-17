export function lastVersionHandler(version:any){
  let localVersion:number = parseInt(localStorage.getItem('lastVersion'))
  if(!localVersion){
    setStorageAndReloadHandler(version)
  }

  localVersion = parseInt(localStorage.getItem('lastVersion'))
  if(version > localVersion){
    setStorageAndReloadHandler(version)
  }
}

const setStorageAndReloadHandler = (version:any) => {
  localStorage.setItem('lastVersion', version ? version : 100)
  window.location.reload();
  return
}