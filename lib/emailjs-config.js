/**
 * @typedef {object} EmailJsEnvironment
 * @property {string} [serviceId]
 * @property {string} [templateId]
 * @property {string} [publicKey]
 */

/**
 * @param {EmailJsEnvironment} environment
 * @returns {{serviceId: string; templateId: string; publicKey: string} | null}
 */
function getEmailJsConfig(environment) {
  const serviceId = environment.serviceId?.trim();
  const templateId = environment.templateId?.trim();
  const publicKey = environment.publicKey?.trim();

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
}

module.exports = { getEmailJsConfig };
