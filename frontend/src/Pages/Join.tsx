
const Join = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="py-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">회원가입</h1>
        </div>
        <form method="POST" className="space-y-6">
            <div className="mt-2">
                <input id="loginId" name="loginId" type="text" required autoComplete="loginId" placeholder='아이디'
                    className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm rounded-t-md"
                />
                <input id="loginPw" name="loginPw" type="password" required autoComplete="current-password" placeholder='비밀번호'
                    className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm border-t-0 rounded-b-md"
                />
            </div>

            <div className="mt-2">
                <input id="loginId" name="loginId" type="text" required autoComplete="loginId" placeholder='이름'
                    className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm rounded-t-md"
                />
                <input id="loginPw" name="loginPw" type="password" required autoComplete="current-password" placeholder='생년월일'
                    className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm border-t-0 rounded-b-md"
                />
            </div>

          <div>
            <button type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
              회원가입
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Join