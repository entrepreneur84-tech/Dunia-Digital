export async function saveMember(env, member){
  const key = "member:" + member.email
  await env.MEMBERS.put(key, JSON.stringify(member))
}

export async function getMember(env,email){
  const data = await env.MEMBERS.get("member:"+email)
  return data ? JSON.parse(data) : null
    }
