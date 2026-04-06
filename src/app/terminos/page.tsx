export default function TerminosPage() {
    return (
        <main className="min-h-screen bg-zinc-950 py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-black text-white mb-4">Términos de Servicio</h1>
                <p className="text-gray-400 text-sm mb-12">Última actualización: Abril 2026</p>

                <div className="prose prose-invert prose-blue max-w-none space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">1. Aceptación de los Términos</h2>
                        <p>Al acceder y utilizar los servicios de Samantha AI, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, le pedimos que no utilice nuestros servicios.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">2. Uso del Servicio</h2>
                        <p>Samantha AI proporciona agentes de inteligencia artificial para la automatización de comunicaciones empresariales. El servicio está destinado exclusivamente a usos legítimos y comerciales. Queda prohibido utilizar el servicio para actividades fraudulentas, ilegales o que violen los derechos de terceros.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">3. Cuentas y Responsabilidad</h2>
                        <p>Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades realizadas bajo su cuenta. Notifíquenos inmediatamente ante cualquier uso no autorizado.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">4. Propiedad Intelectual</h2>
                        <p>Todo el contenido, la tecnología y los materiales de Samantha AI son propiedad exclusiva de Samantha AI Inc. y están protegidos por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción sin autorización expresa.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">5. Limitación de Responsabilidad</h2>
                        <p>Samantha AI no se hace responsable por daños indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del servicio. Nuestra responsabilidad máxima se limita al monto pagado por el servicio en los 12 meses anteriores al evento.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">6. Modificaciones</h2>
                        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos de cambios significativos por correo electrónico o mediante un aviso destacado en nuestra plataforma.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">7. Contacto</h2>
                        <p>Para cualquier consulta sobre estos términos, contáctenos en: <a href="mailto:legal@samantha.ai" className="text-blue-400 hover:underline">legal@samantha.ai</a></p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-zinc-800">
                    <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">← Volver al inicio</a>
                </div>
            </div>
        </main>
    );
}
