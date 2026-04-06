export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-zinc-950 py-24 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-black text-white mb-4">Política de Privacidad</h1>
                <p className="text-gray-400 text-sm mb-12">Última actualización: Abril 2026</p>

                <div className="prose prose-invert prose-blue max-w-none space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">1. Información que Recopilamos</h2>
                        <p>Recopilamos información que usted nos proporciona directamente al registrarse, como nombre, correo electrónico y datos de la empresa. También recopilamos datos de uso, registros de llamadas e interacciones con nuestros agentes de IA de forma anonimizada para mejorar el servicio.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">2. Uso de la Información</h2>
                        <p>Utilizamos la información recopilada para proveer, mantener y mejorar nuestros servicios; procesar transacciones; enviar comunicaciones relacionadas con el servicio; y cumplir con obligaciones legales. No vendemos su información personal a terceros.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">3. Compartir Información</h2>
                        <p>Podemos compartir su información con proveedores de servicios de confianza que nos asisten en la operación del negocio, siempre bajo acuerdos de confidencialidad estrictos. También podemos divulgar información cuando sea requerido por ley o para proteger los derechos de la empresa.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">4. Seguridad de los Datos</h2>
                        <p>Implementamos medidas de seguridad técnicas y organizacionales para proteger su información contra acceso no autorizado, alteración, divulgación o destrucción. Todas las comunicaciones están cifradas mediante TLS/SSL.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">5. Sus Derechos</h2>
                        <p>Usted tiene derecho a acceder, corregir o eliminar su información personal. Para ejercer estos derechos, contáctenos en privacidad@samantha.ai. Procesaremos su solicitud en un plazo de 30 días hábiles.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">6. Retención de Datos</h2>
                        <p>Conservamos su información durante el tiempo necesario para proveer nuestros servicios y cumplir con nuestras obligaciones legales. Una vez finalizada la relación contractual, los datos se eliminan en un plazo máximo de 90 días.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">7. Cambios a Esta Política</h2>
                        <p>Podemos actualizar esta política periódicamente. Le notificaremos sobre cambios sustanciales a través de un aviso en nuestra plataforma o por correo electrónico.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">8. Contacto</h2>
                        <p>Si tiene preguntas sobre esta política, contáctenos en: <a href="mailto:privacidad@samantha.ai" className="text-blue-400 hover:underline">privacidad@samantha.ai</a></p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-zinc-800">
                    <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">← Volver al inicio</a>
                </div>
            </div>
        </main>
    );
}
