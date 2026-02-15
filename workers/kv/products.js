export async function saveProduct(id, data, env) {
  return await env.PRODUCTS.put(id, JSON.stringify(data));
}

export async function getProduct(id, env) {
  return await env.PRODUCTS.get(id, { type: "json" });
}

export async function listProducts(env) {
  const list = await env.PRODUCTS.list();
  let result = [];
  for (const key of list.keys) {
    const data = await env.PRODUCTS.get(key.name, { type: "json" });
    result.push(data);
  }
  return result;
  }
