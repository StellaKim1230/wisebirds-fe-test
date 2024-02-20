import { use } from 'react';
import styles from './page.module.css';
import { Member } from '../types/member';

async function getMe() {
  const response = await fetch('http://localhost:4000/api/auth/me');
  const me = await response.json();
  return me;
}

export default function Main() {
  const me: Member = use(getMe());

  return <main className={styles.main}>{me.name}</main>;
}
