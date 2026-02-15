export function sleep(ms){ return new Promise(r=>setTimeout(r,ms)) }

export function formatIDR(num){
  return "Rp "+num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")
}
