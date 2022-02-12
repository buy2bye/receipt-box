import axios from 'axios'

const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
