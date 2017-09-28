import ServiceLayer from './ServiceLayer.js';

class BusinessPartnerService {

  static update(bp) {
    var resource = `BusinessPartners('${bp.CardCode}')`;
    return ServiceLayer.patch(resource, bp);
  }

  static create(bp) {
    var resource = 'BusinessPartners';
    return ServiceLayer.post(resource, bp);
  }

  static getAll() {
    var resource = 'BusinessPartners?$orderby=CardCode';
    return ServiceLayer.get(resource);
  }
}

export default BusinessPartnerService;
