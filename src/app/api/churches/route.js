export async function GET(req) {
  const res = await fetch('https://crechurches.org/churches/')
  const html = await res.text();
  
  // Split the HTML into church pods
  const churchPods = html.split('<div class="church_pod">').slice(1);
  
  // Extract church data
  const churches = churchPods.map(pod => {
    // Extract church name
    const churchNameMatch = pod.match(/<div class="church_name">(.*?)<\/div>/);
    const churchName = churchNameMatch ? churchNameMatch[1].trim() : '';
    
    // Extract city and state
    const cityStateMatch = pod.match(/<div class="city_state">(.*?)<\/div>/);
    const cityState = cityStateMatch ? cityStateMatch[1].trim() : '';
    
    return {
      church_name: churchName,
      city_state: cityState
    };
  });

  return Response.json(churches);
}