export const LEGAL_SECTIONS = [
  {
    id: 'terminos-y-condiciones', number: '01', title: 'Términos y condiciones',
    blocks: [
      { type: 'paragraph', text: 'Estos términos regulan el acceso y uso de Darkshop, plataforma que conecta establecimientos de moda con compradores en Colombia.' },
      { type: 'bullets', items: [
        'Darkshop opera como plataforma tecnológica; los productos son publicados por establecimientos registrados, quienes son responsables de su descripción, disponibilidad y despacho.',
        'El usuario acepta proporcionar información veraz y mantener la confidencialidad de sus credenciales.',
        'Está prohibido el uso automatizado no autorizado, la suplantación de identidad y cualquier conducta que afecte la operación de la plataforma o de los establecimientos.',
        'Cada establecimiento publica sus piezas, tallas, precios y existencias. Darkshop puede moderar publicaciones que no cumplan las políticas del ecosistema.',
        'La compra se perfecciona cuando el pedido es confirmado. Un mismo pedido puede incluir productos de distintos establecimientos.',
        'Los pagos se procesan a través de Darkshop mediante pasarelas autorizadas, conforme a la normativa e información corporativa dispuesta.',
        'El establecimiento responde por la calidad, confirmación y despacho del producto; Darkshop responde por la operación de la plataforma y por la mediación en disputas.',
        'Darkshop puede suspender cuentas y establecimientos ante incumplimientos, fraude o riesgos para la comunidad.',
      ] },
    ], finalNote: 'Este término puede ser actualizado a la fecha de última actualización; siempre estará visible en esta página.',
  },
  {
    id: 'politicas-de-privacidad', number: '02', title: 'Políticas de privacidad',
    blocks: [
      { type: 'subtitle', text: 'Explicamos qué información recopilamos, con qué finalidad y cómo puedes controlarla.' },
      { type: 'bullets', items: [
        'Datos de identificación, contacto, dirección de envío, historial de pedidos y datos de navegación.',
        'Procesar pedidos, prevenir fraudes, brindar soporte y mejorar la experiencia de compra.',
        'La información se usa únicamente para las finalidades autorizadas por el titular.',
        'Compartimos datos estrictamente necesarios con establecimientos, vendedores, transportadoras y pasarelas de pago.',
        'Los datos se conservan mientras exista relación con el usuario o exista obligación legal.',
        'Puedes consultar, actualizar, rectificar y suprimir tu información, así como revocar la autorización.',
      ] },
    ], finalNote: 'Puedes solicitar la eliminación de tu cuenta desde Mi cuenta o escribiendo a darkshop@gmail.com.',
  },
  {
    id: 'tratamiento-datos-personales', number: '03', title: 'Tratamiento de datos personales',
    blocks: [
      { type: 'paragraph', text: 'Tratamos tus datos conforme a la normativa colombiana de protección de datos personales.' },
      { type: 'subtitle', text: 'DARKSOHOP S.A.S., Cali Valle del Cauca, Colombia — datosderechohabiente.' },
      { type: 'bullets', items: [
        'Nombres, documento, correo, teléfono, dirección, datos de transacción y datos de despacho.',
        'Gestión de cuenta, ejecución de la compra, facturación, logística, seguridad y comunicaciones.',
        'La autorización se otorga al crear la cuenta o al completar un pedido.',
        'Acceso, actualización, rectificación, supresión, revocatoria y prueba de la autorización.',
      ] },
    ], finalNote: 'Las consultas se atienden en un término máximo de diez (10) días hábiles. Las reclamos se atienden en un término máximo de quince (15) días hábiles. Vigente desde el 18 de agosto de 2026 y mientras se mantenga la operación de la plataforma.',
  },
  {
    id: 'politicas-de-cookies', number: '04', title: 'Políticas de cookies',
    blocks: [{ type: 'bullets', items: [
      'Permiten la sesión el carrito y la seguridad; no pueden desactivarse.',
      'Registran idioma, género de navegación y rango etario.',
      'Nos permiten entender el uso agregado de la plataforma.',
      'La autorización se otorga al crear la cuenta o al completar un pedido.',
      'Se usan solo cuando el usuario lo autoriza expresamente.',
    ] }], finalNote: 'Las consultas se atienden en un término máximo de diez (10) días hábiles.',
  },
  {
    id: 'envios', number: '05', title: 'Envíos',
    blocks: [
      { type: 'paragraph', text: 'Darkshop es una plataforma multi-tienda: los productos comprados a distintos establecimientos pueden despacharse por separado y llegar en fechas diferentes.' },
      { type: 'bullets', items: [
        'Envíos a toda Colombia. Algunas zonas pueden requerir tiempos adicionales.',
        'Entre 3 y 5 días hábiles según el establecimiento.',
        'Gestión de cuenta, ejecución de la compra, facturación, logística, seguridad y comunicaciones.',
        'Ciudades principales 2 a 4 días hábiles. Otras ciudades 4 a 8 días hábiles.',
        'El costo se calcula en el checkout. Cada establecimiento puede definir envío gratis desde un monto.',
        'Cada despacho tiene guía independiente, visible en Mi cuenta / Pedidos.',
        'Tras dos intentos fallidos el pedido regresa al establecimiento y se coordina una nueva entrega.',
        'Un pedido con tres tiendas genera tres despachos con seguimiento propio por cada establecimiento.',
      ] },
    ],
  },
  {
    id: 'devoluciones', number: '06', title: 'Devoluciones',
    blocks: [
      { type: 'paragraph', text: 'Puedes solicitar la devolución dentro de los cinco (5) días hábiles siguientes a la entrega.' },
      { type: 'steps', items: ['Solicitada', 'En revisión', 'Aprobada', 'Rechazada'] },
      { type: 'bullets', items: [
        'La pieza debe estar sin usar, con etiquetas y en su empaque original.',
        'No aplica para ropa interior, piezas personalizadas ni productos de outlet marcados como venta final.',
        'El establecimiento gestiona la recepción, validación y aprobación de la devolución.',
        'Si no hay acuerdo, Darkshop interviene y define la solución dentro de la compra protegida.',
      ] },
    ],
  },
  {
    id: 'compras', number: '07', title: 'Compras',
    blocks: [
      { type: 'paragraph', text: 'Toda compra realizada dentro de la plataforma está cubierta por nuestro programa de compra protegida.' },
      { type: 'bullets', items: [
        'Los pagos se procesan por Darkshop con pasarelas certificadas.',
        'Cada establecimiento pasa por verificación de identidad y datos comerciales.',
        'Estados, guías y tiempos siempre visibles en tu cuenta.',
        'Acompañamiento cuando el producto no llega o no corresponde a lo publicado.',
        'Cuando aplique, el reembolso se emite al medio de pago original.',
      ] },
    ],
  },
  {
    id: 'vendedores', number: '08', title: 'Vendedores',
    blocks: [
      { type: 'paragraph', text: 'Darkshop es la plataforma. El establecimiento es el vendedor. El producto es publicado por el establecimiento.' },
      { type: 'bullets', items: [
        'Fotografías, composición, tallaje y medidas deben corresponder a la pieza real.',
        'El establecimiento mantiene el stock actualizado desde su panel de marca.',
        'Cada establecimiento define origen de despacho y gestiona sus devoluciones bajo las reglas comunes.',
        'El vendedor responde en máximo 24 horas hábiles a las solicitudes de compradores.',
        'Podemos ocultar publicaciones, limitar ventas o suspender tiendas ante incumplimientos reiterados.',
      ] },
    ],
  },
  {
    id: 'propiedad-intelectual', number: '09', title: 'Propiedad intelectual',
    blocks: [{ type: 'bullets', items: [
      'El nombre, logotipo, interfaz y sistema visual de Darkshop están protegidos.',
      'Cada tienda conserva los derechos sobre sus imágenes, diseños y composiciones.',
      'Estados legal/habeas data para reportar un uso indebido de contenido.',
    ] }],
  },
  {
    id: 'seguridad', number: '10', title: 'Seguridad',
    blocks: [{ type: 'bullets', items: [
      'Verificación en dos pasos, verificación de correo y teléfono, y control de sesiones activas.',
      'Notificamos accesos desde dispositivos o ubicaciones no reconocidas.',
      'Usa contraseñas únicas, no compartas códigos de verificación y cierra sesión en equipos no reconocidos.',
    ] }],
  },
  {
    id: 'contacto', number: '11', title: 'Contacto',
    blocks: [{ type: 'bullets', items: [
      'soporte@darkshop.co · Lunes a viernes 8:00 a 18:00',
      'legal@darkshop.co',
      'datos@darkshop.co',
    ] }],
  },
]
