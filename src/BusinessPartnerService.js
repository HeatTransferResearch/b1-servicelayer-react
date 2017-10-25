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

  static del(bp) {
    console.log(bp);
    var resource = `BusinessPartners('${bp.CardCode}')`;
    return ServiceLayer.del(resource, bp);
  }

  static getAll() {
    //TODO:  implement paging.
    var resource = 'BusinessPartners?$orderby=CardCode';
    return ServiceLayer.get(resource);
  }

}
export default BusinessPartnerService;
