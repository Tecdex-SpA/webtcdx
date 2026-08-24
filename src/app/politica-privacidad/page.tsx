import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de TECDEX Compliance, plataforma GRC de TECDEX SpA.",
};

const updatedAt = "11 de mayo de 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-brand-soft text-brand-slate">
      <header className="border-b border-white/10 bg-brand-navy py-5">
        <div className="section-shell flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-white/80 hover:text-white">
            ← Volver al inicio
          </Link>
          <a
            href="mailto:contacto@tecdex.net"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-sky"
          >
            contacto@tecdex.net
          </a>
        </div>
      </header>

      <section className="bg-brand-navy py-16 text-white sm:py-20">
        <div className="section-shell max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">
            TECDEX Compliance
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
            Esta política informa cómo TECDEX SpA recopila, utiliza, almacena y protege los datos personales entregados a través del sitio web comercial de TECDEX Compliance.
          </p>
          <p className="mt-4 text-sm text-white/50">Última actualización: {updatedAt}</p>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="section-shell max-w-5xl">
          <div className="rounded-[2rem] border border-brand-line bg-white p-6 shadow-sm sm:p-10">
            <div className="prose prose-slate max-w-none">
              <h2>1. Responsable del tratamiento</h2>
              <p>
                El responsable del tratamiento de los datos personales recopilados a través de este sitio web es TECDEX SpA, empresa chilena prestadora de servicios tecnológicos, infraestructura, seguridad, nube, soporte y desarrollo de software empresarial.
              </p>
              <p>
                Para consultas relacionadas con privacidad o tratamiento de datos personales, puedes escribir a: <a href="mailto:contacto@tecdex.net">contacto@tecdex.net</a>.
              </p>

              <h2>2. Datos personales que podemos recopilar</h2>
              <p>
                A través de formularios de contacto, solicitud de demo u otros medios disponibles en el sitio, podemos recopilar datos tales como:
              </p>
              <ul>
                <li>Nombre y apellido.</li>
                <li>Empresa u organización.</li>
                <li>Cargo o rol.</li>
                <li>Correo electrónico.</li>
                <li>Teléfono.</li>
                <li>Normativa o área de interés.</li>
                <li>Mensaje, consulta o antecedentes comerciales entregados voluntariamente.</li>
                <li>Información técnica básica asociada a la navegación, como fecha, hora, navegador, dispositivo o dirección IP, cuando corresponda.</li>
              </ul>

              <h2>3. Finalidades del tratamiento</h2>
              <p>Los datos personales podrán ser tratados para las siguientes finalidades:</p>
              <ul>
                <li>Responder solicitudes de contacto, información o demo comercial.</li>
                <li>Evaluar el interés comercial en TECDEX Compliance.</li>
                <li>Coordinar reuniones, presentaciones, demos o evaluaciones comerciales.</li>
                <li>Enviar información relacionada con productos, servicios, propuestas o novedades de TECDEX, cuando corresponda.</li>
                <li>Mantener registros comerciales, administrativos y de seguimiento.</li>
                <li>Mejorar la experiencia del sitio web, su seguridad y su funcionamiento técnico.</li>
                <li>Cumplir obligaciones legales, contractuales, administrativas o regulatorias aplicables.</li>
              </ul>

              <h2>4. Base de licitud y consentimiento</h2>
              <p>
                El tratamiento de datos personales se realizará conforme a la normativa chilena aplicable sobre protección de datos personales, incluyendo la Ley N° 19.628 sobre Protección de la Vida Privada y las modificaciones introducidas por la Ley N° 21.719, en la medida que sus disposiciones resulten aplicables.
              </p>
              <p>
                Al completar y enviar formularios en este sitio, el usuario declara entregar sus datos de forma voluntaria y autoriza a TECDEX a utilizarlos para las finalidades informadas en esta política.
              </p>

              <h2>5. Conservación de los datos</h2>
              <p>
                Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades para las cuales fueron recopilados, atender solicitudes comerciales, mantener registros administrativos o cumplir obligaciones legales aplicables.
              </p>
              <p>
                Cuando los datos ya no sean necesarios para dichas finalidades, TECDEX podrá eliminarlos, anonimizarlos o conservarlos bloqueados cuando exista una obligación legal o interés legítimo para ello.
              </p>

              <h2>6. Comunicación a terceros y proveedores</h2>
              <p>
                TECDEX podrá utilizar proveedores tecnológicos o comerciales para operar el sitio, gestionar formularios, administrar contactos, alojar información, enviar comunicaciones o mantener sistemas de gestión comercial. Dichos proveedores deberán tratar los datos únicamente para las finalidades encargadas y bajo condiciones razonables de confidencialidad y seguridad.
              </p>
              <p>
                TECDEX no venderá datos personales a terceros. Los datos podrán ser comunicados cuando exista autorización del titular, obligación legal, requerimiento de autoridad competente o necesidad razonable para la prestación de servicios solicitados por el usuario.
              </p>

              <h2>7. Transferencias internacionales</h2>
              <p>
                Algunos proveedores tecnológicos utilizados por TECDEX podrían operar infraestructura, servicios de nube, formularios, analítica, correo electrónico o sistemas CRM ubicados fuera de Chile. En tales casos, TECDEX procurará utilizar proveedores que cuenten con estándares razonables de seguridad y protección de datos.
              </p>

              <h2>8. Seguridad de la información</h2>
              <p>
                TECDEX aplicará medidas técnicas y organizativas razonables para proteger los datos personales contra acceso no autorizado, pérdida, uso indebido, alteración, divulgación o destrucción no autorizada.
              </p>
              <p>
                Sin perjuicio de lo anterior, ningún sistema tecnológico o transmisión por internet puede considerarse absolutamente seguro, por lo que el usuario debe evitar enviar información sensible o confidencial que no sea necesaria para la solicitud comercial.
              </p>

              <h2>9. Derechos de los titulares</h2>
              <p>
                De acuerdo con la normativa chilena aplicable, los titulares de datos personales pueden solicitar, según corresponda, acceso, información, rectificación, cancelación, eliminación, oposición, bloqueo u otros derechos que sean reconocidos por la ley vigente o futura normativa aplicable.
              </p>
              <p>
                Para ejercer estos derechos, el titular puede enviar una solicitud a <a href="mailto:contacto@tecdex.net">contacto@tecdex.net</a>, indicando su nombre, medio de contacto y una descripción clara de la solicitud. TECDEX podrá solicitar antecedentes adicionales para verificar la identidad del solicitante antes de responder.
              </p>

              <h2>10. Cookies, analítica y tecnologías similares</h2>
              <p>
                Este sitio puede utilizar cookies o tecnologías similares para permitir su funcionamiento, medir visitas, analizar rendimiento, mejorar la experiencia del usuario o apoyar actividades comerciales. El usuario puede configurar su navegador para bloquear o eliminar cookies, considerando que algunas funciones podrían verse afectadas.
              </p>

              <h2>11. Formularios externos y Zoho</h2>
              <p>
                En caso de que el sitio integre formularios externos, como Zoho Forms, Zoho CRM u otras herramientas de gestión comercial, los datos enviados podrán ser tratados también en dichas plataformas conforme a sus respectivas condiciones, políticas de privacidad y medidas de seguridad.
              </p>

              <h2>12. Información sobre IA Auditor</h2>
              <p>
                IA Auditor es una funcionalidad de apoyo al análisis y orientación dentro de TECDEX Compliance. No reemplaza auditorías certificadoras, consultores, auditores ni responsables internos. En el sitio comercial, cualquier dato entregado a través de formularios será tratado con fines comerciales y de contacto, no para decisiones automatizadas con efectos legales sobre el titular.
              </p>

              <h2>13. Menores de edad</h2>
              <p>
                Este sitio y sus formularios están dirigidos a empresas, profesionales y organizaciones. No están destinados a recopilar deliberadamente datos personales de menores de edad.
              </p>

              <h2>14. Cambios a esta política</h2>
              <p>
                TECDEX podrá actualizar esta Política de Privacidad para reflejar cambios legales, técnicos, comerciales u operativos. La versión vigente será publicada en este mismo sitio, indicando su fecha de última actualización.
              </p>

              <h2>15. Contacto</h2>
              <p>
                Para consultas sobre esta política, privacidad o tratamiento de datos personales, puedes contactar a TECDEX en:
              </p>
              <ul>
                <li>Correo: <a href="mailto:contacto@tecdex.net">contacto@tecdex.net</a></li>
                <li>Sitio web: <a href="https://www.tecdex.net">https://www.tecdex.net</a></li>
              </ul>

              <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
                <strong>Nota:</strong> Esta política es una base estándar para uso comercial informativo. TECDEX podrá revisarla con asesoría legal especializada antes de iniciar campañas, conectar formularios productivos o tratar datos personales a mayor escala.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
