import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getUsers } from '@/app/lib';
import { IUsers } from '@/app/types';
import { getServerSession } from 'next-auth';
import { AddUser } from './components';
import UserTable from './components/UserTable';

type SearchParamsProps = {
  searchParams: { page: string };
};

export default async function User(token: string | undefined) {
  const session = await getServerSession(authOptions);
  token = session?.user.data.accessToken;
  const listUsers: IUsers = await getUsers(token);
  const users = listUsers?.data.results

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <AddUser token={token} />
      </div>
      <UserTable body={users} token={token}/>
    </div>
  );
}
