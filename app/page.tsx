import { Redirect } from "next";
import {getSession, login, logout} from './lib'
import { redirect } from "next/dist/server/api-utils";

export default function Home() {
  const session = getSession()
  return (
    <section>
      <form action={async (formdata)=>{
        'use server'
        await login(formdata)
        redirect('/')
      }}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit">Submit</input>
      </form>

      <form {async (formdata)=>{
        'use server'
        await login(formdata)
        redirect('/')
      }}>
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session,null,2)}</pre>
    </section>
  );
}
