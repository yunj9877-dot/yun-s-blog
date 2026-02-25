import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-4xl font-extrabold text-white mb-12 tracking-tight">
                        이용약관 및 개인정보 처리방침
                    </h1>

                    {/* 이용약관 */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-slate-800">
                            📋 이용약관
                        </h2>

                        <div className="space-y-8 text-slate-300 leading-relaxed">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제1조 (목적)</h3>
                                <p>
                                    본 약관은 DevBlog(이하 &quot;서비스&quot;)를 이용함에 있어 서비스와 이용자 간의 권리, 의무 및 책임사항,
                                    기타 필요한 사항을 규정함을 목적으로 합니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제2조 (정의)</h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-400">
                                    <li>&quot;서비스&quot;란 DevBlog가 제공하는 블로그 플랫폼 및 관련 제반 서비스를 말합니다.</li>
                                    <li>&quot;이용자&quot;란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                                    <li>&quot;회원&quot;이란 서비스에 가입하여 이메일과 비밀번호를 통해 인증된 이용자를 말합니다.</li>
                                    <li>&quot;게시물&quot;이란 회원이 서비스에 게시한 글, 이미지 등의 콘텐츠를 말합니다.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제3조 (약관의 효력)</h3>
                                <p>
                                    본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용되며,
                                    서비스에 가입하거나 이용을 시작하는 시점에 동의한 것으로 간주합니다.
                                    약관 변경 시 서비스 내 공지를 통해 고지하며, 변경 후 계속 이용할 경우 변경 약관에 동의한 것으로 봅니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제4조 (서비스 이용)</h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-400">
                                    <li>비회원은 게시물 열람이 가능합니다.</li>
                                    <li>회원은 게시물 작성, 수정, 삭제 등의 기능을 이용할 수 있습니다.</li>
                                    <li>서비스는 연중무휴 24시간 제공을 원칙으로 하나, 시스템 점검 등의 사유로 일시 중단될 수 있습니다.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제5조 (이용자의 의무)</h3>
                                <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
                                <ul className="list-disc list-inside space-y-2 text-slate-400">
                                    <li>타인의 개인정보를 도용하거나 허위 정보를 등록하는 행위</li>
                                    <li>서비스를 이용하여 법령 또는 공서양속에 위반하는 내용을 게시하는 행위</li>
                                    <li>타인의 저작권 등 지적재산권을 침해하는 행위</li>
                                    <li>서비스의 운영을 고의로 방해하는 행위</li>
                                    <li>악성코드 또는 스팸을 유포하는 행위</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제6조 (게시물의 관리)</h3>
                                <p>
                                    회원이 작성한 게시물의 저작권은 해당 회원에게 귀속됩니다.
                                    다만, 서비스 운영 목적상 게시물을 서비스 내에서 노출, 검색 결과에 포함시킬 수 있습니다.
                                    관리자는 서비스 정책에 위반되는 게시물을 사전 통지 없이 삭제할 수 있습니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제7조 (면책 조항)</h3>
                                <p>
                                    서비스는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
                                    이용자가 게시한 콘텐츠로 인해 발생하는 분쟁에 대해 서비스는 책임을 지지 않습니다.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 개인정보 처리방침 */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-slate-800">
                            🔒 개인정보 처리방침
                        </h2>

                        <div className="space-y-8 text-slate-300 leading-relaxed">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제1조 (수집하는 개인정보)</h3>
                                <p className="mb-3">서비스는 회원가입 및 서비스 이용을 위해 다음과 같은 개인정보를 수집합니다:</p>
                                <ul className="list-disc list-inside space-y-2 text-slate-400">
                                    <li><strong className="text-slate-300">필수 항목:</strong> 이메일 주소, 비밀번호(암호화 저장)</li>
                                    <li><strong className="text-slate-300">자동 수집 항목:</strong> 서비스 이용 기록, 접속 로그, 접속 IP 정보</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제2조 (개인정보의 이용 목적)</h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-400">
                                    <li>회원 식별 및 가입 의사 확인</li>
                                    <li>서비스 제공 및 콘텐츠 관리</li>
                                    <li>서비스 이용 통계 및 분석</li>
                                    <li>서비스 개선 및 신규 기능 개발</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제3조 (개인정보의 보관 및 파기)</h3>
                                <p>
                                    개인정보는 회원 탈퇴 시 지체 없이 파기합니다.
                                    다만, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-slate-400 mt-3">
                                    <li>계약 또는 청약 철회에 관한 기록: 5년</li>
                                    <li>접속 로그 기록: 3개월</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제4조 (개인정보의 제3자 제공)</h3>
                                <p>
                                    서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                                    다만, 법률에 특별한 규정이 있는 경우, 수사 목적으로 법령에 정해진 절차에 따라
                                    수사기관의 요구가 있는 경우에는 예외로 합니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제5조 (개인정보의 안전성 확보 조치)</h3>
                                <ul className="list-disc list-inside space-y-2 text-slate-400">
                                    <li>비밀번호는 암호화하여 저장 및 관리합니다.</li>
                                    <li>개인정보 접근 권한을 최소화하고 관리합니다.</li>
                                    <li>SSL/TLS 암호화 통신을 사용하여 데이터를 전송합니다.</li>
                                    <li>Supabase의 Row Level Security(RLS) 정책을 적용하여 데이터 접근을 제어합니다.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제6조 (이용자의 권리)</h3>
                                <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
                                <ul className="list-disc list-inside space-y-2 text-slate-400 mt-3">
                                    <li>개인정보 열람 요구</li>
                                    <li>개인정보 정정 및 삭제 요구</li>
                                    <li>개인정보 처리 정지 요구</li>
                                    <li>회원 탈퇴를 통한 개인정보 삭제</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">제7조 (쿠키의 사용)</h3>
                                <p>
                                    서비스는 로그인 세션 유지를 위해 쿠키를 사용합니다.
                                    이용자는 브라우저 설정을 통해 쿠키를 거부할 수 있으나,
                                    이 경우 로그인이 필요한 서비스 이용이 제한될 수 있습니다.
                                </p>
                            </div>

                            <p className="text-sm text-slate-500 mt-8">
                                본 약관 및 개인정보 처리방침은 2026년 2월 25일부터 시행됩니다.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}
