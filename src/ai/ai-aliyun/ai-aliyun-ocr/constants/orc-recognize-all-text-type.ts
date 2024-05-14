export enum RecognizeAllTextType {
  Advanced='Advanced',
  General='General',
  Commerce='Commerce',
  HandWriting='HandWriting',
  MultiLang='MultiLang',
  Table='Table',
  IdCard='IdCard',
  BankCard='BankCard',
  InternationalPassport='InternationalPassport',
  ChinesePassport='ChinesePassport',
  SocialSecurityCard='SocialSecurityCard',
  PermitToHK_MO_TW='PermitToHK_MO_TW',
  PermitToMainland='PermitToMainland',
  HouseholdHead='HouseholdHead',
  HouseholdResident='HouseholdResident',
  EstateCertification='EstateCertification',
  BirthCertification='BirthCertification',
  HKIdCard='HKIdCard',
  InternationalIdCard='InternationalIdCard',
  Stamp='Stamp',
  MixedInvoice='MixedInvoice',
  Invoice='Invoice',
  CarInvoice='CarInvoice',
  QuotaInvoice='QuotaInvoice',
  AirItinerary='AirItinerary',
  TrainTicket='TrainTicket',
  TollInvoice='TollInvoice',
  RollTicket='RollTicket',
  BankAcceptance='BankAcceptance',
  BusShipTicket='BusShipTicket',
  NonTaxInvoice='NonTaxInvoice',
  CommonPrintedInvoice='CommonPrintedInvoice',
  HotelConsume='HotelConsume',
  PaymentRecord='PaymentRecord',
  PurchaseRecord='PurchaseRecord',
  RideHailingItinerary='RideHailingItinerary',
  ShoppingReceipt='ShoppingReceipt',
  TaxClearanceCertificate='TaxClearanceCertificate',
  UsedCarInvoice='UsedCarInvoice',
  VehicleLicense='VehicleLicense',
  DrivingLicense='DrivingLicense',
  VehicleRegistration='VehicleRegistration',
  VehicleCertification='VehicleCertification',
  LicensePlateNumber='LicensePlateNumber',
  CarVinCode='CarVinCode',
  BusinessLicense='BusinessLicense',
  InternationalBusinessLicense='InternationalBusinessLicense',
  MedicalDeviceManageLicense='MedicalDeviceManageLicense',
  MedicalDeviceProduceLicense='MedicalDeviceProduceLicense',
  CosmeticProduceLicense='CosmeticProduceLicense',
  QrCode='QrCode',
  BarCode='BarCode',
  TaxiInvoice='TaxiInvoice',
  TrademarkCertificate='TrademarkCertificate',
  FoodProduceLicense='FoodProduceLicense',
  FoodManagementLicense='FoodManagementLicense',
  ClassIIMedicalDeviceManageLicense='ClassIIMedicalDeviceManageLicense',
  WayBill='WayBill',
  BankAccountPermit='BankAccountPermit'
}

export const RecognizeAllTextTypeOptions = [
  {
    value: RecognizeAllTextType.Advanced,
    label: '通用文字识别高精版'
  },
  {
    value: RecognizeAllTextType.General,
    label: '通用文字识别基础版'
  },
  {
    value: RecognizeAllTextType.Commerce,
    label: '电商图片文字'
  },
  {
    value: RecognizeAllTextType.HandWriting,
    label: '手写文字'
  },
  {
    value: RecognizeAllTextType.MultiLang,
    label: '多语言文字'
  },
  {
    value: RecognizeAllTextType.Table,
    label: '表格'
  },
  {
    value: RecognizeAllTextType.IdCard,
    label: '身份证'
  },
  {
    value: RecognizeAllTextType.BankCard,
    label: '银行卡'
  },
  {
    value: RecognizeAllTextType.InternationalPassport,
    label: '国际护照'
  },
  {
    value: RecognizeAllTextType.ChinesePassport,
    label: '中国护照'
  },
  {
    value: RecognizeAllTextType.SocialSecurityCard,
    label: '社保卡'
  },
  {
    value: RecognizeAllTextType.PermitToHK_MO_TW,
    label: '往来港澳台通行证'
  },
  {
    value: RecognizeAllTextType.PermitToMainland,
    label: '来往中国大陆（内地）通行证'
  },
  {
    value: RecognizeAllTextType.HouseholdHead,
    label: '户口本首页'
  },
  {
    value: RecognizeAllTextType.HouseholdResident,
    label: '户口本常住人口页'
  },
  {
    value: RecognizeAllTextType.EstateCertification,
    label: '不动产权证'
  },
  {
    value: RecognizeAllTextType.BirthCertification,
    label: '出生证明'
  },
  {
    value: RecognizeAllTextType.HKIdCard,
    label: '中国香港身份证'
  },
  {
    value: RecognizeAllTextType.InternationalIdCard,
    label: '国际身份证'
  },
  {
    value: RecognizeAllTextType.Stamp,
    label: '公章'
  },
  {
    value: RecognizeAllTextType.MixedInvoice,
    label: '混贴票证'
  },
  {
    value: RecognizeAllTextType.Invoice,
    label: '增值税发票'
  },
  {
    value: RecognizeAllTextType.CarInvoice,
    label: '机动车销售统一发票'
  },
  {
    value: RecognizeAllTextType.QuotaInvoice,
    label: '定额发票'
  },
  {
    value: RecognizeAllTextType.AirItinerary,
    label: '航空行程单'
  },
  {
    value: RecognizeAllTextType.TrainTicket,
    label: '火车票'
  },
  {
    value: RecognizeAllTextType.TollInvoice,
    label: '过路过桥费发票'
  },
  {
    value: RecognizeAllTextType.RollTicket,
    label: '增值税发票卷票'
  },
  {
    value: RecognizeAllTextType.BankAcceptance,
    label: '银行承兑汇票'
  },
  {
    value: RecognizeAllTextType.BusShipTicket,
    label: '客运车船票'
  },
  {
    value: RecognizeAllTextType.NonTaxInvoice,
    label: '非税收入发票'
  },
  {
    value: RecognizeAllTextType.CommonPrintedInvoice,
    label: '通用机打发票'
  },
  {
    value: RecognizeAllTextType.HotelConsume,
    label: '酒店流水'
  },
  {
    value: RecognizeAllTextType.PaymentRecord,
    label: '支付详情页'
  },
  {
    value: RecognizeAllTextType.PurchaseRecord,
    label: '电商订单页'
  },
  {
    value: RecognizeAllTextType.RideHailingItinerary,
    label: '网约车行程单'
  },
  {
    value: RecognizeAllTextType.ShoppingReceipt,
    label: '购物小票'
  },
  {
    value: RecognizeAllTextType.TaxClearanceCertificate,
    label: '税收完税证明'
  },
  {
    value: RecognizeAllTextType.UsedCarInvoice,
    label: '二手车销售统一发票'
  },
  {
    value: RecognizeAllTextType.VehicleLicense,
    label: '行驶证'
  },
  {
    value: RecognizeAllTextType.DrivingLicense,
    label: '驾驶证'
  },
  {
    value: RecognizeAllTextType.VehicleRegistration,
    label: '机动车登记证'
  },
  {
    value: RecognizeAllTextType.VehicleCertification,
    label: '车辆合格证'
  },
  {
    value: RecognizeAllTextType.LicensePlateNumber,
    label: '车牌'
  },
  {
    value: RecognizeAllTextType.CarVinCode,
    label: '车辆 vin 码'
  },
  {
    value: RecognizeAllTextType.BusinessLicense,
    label: '营业执照'
  },
  {
    value: RecognizeAllTextType.InternationalBusinessLicense,
    label: '国际企业执照'
  },
  {
    value: RecognizeAllTextType.MedicalDeviceManageLicense,
    label: '医疗器械经营许可证'
  },
  {
    value: RecognizeAllTextType.MedicalDeviceProduceLicense,
    label: '医疗器械生产许可证'
  },
  {
    value: RecognizeAllTextType.CosmeticProduceLicense,
    label: '化妆品生产许可证'
  },
  {
    value: RecognizeAllTextType.QrCode,
    label: '二维码'
  },
  {
    value: RecognizeAllTextType.BarCode,
    label: '条形码'
  },
  {
    value: RecognizeAllTextType.TaxiInvoice,
    label: '出租车发票'
  },
  {
    value: RecognizeAllTextType.TrademarkCertificate,
    label: '商标注册证'
  },
  {
    value: RecognizeAllTextType.FoodProduceLicense,
    label: '食品生产许可证'
  },
  {
    value: RecognizeAllTextType.FoodManagementLicense,
    label: '食品经营许可证'
  },
  {
    value: RecognizeAllTextType.ClassIIMedicalDeviceManageLicense,
    label: '第二类医疗器械经营备案凭证'
  },
  {
    value: RecognizeAllTextType.WayBill,
    label: '电子面单'
  },
  {
    value: RecognizeAllTextType.BankAccountPermit,
    label: '银行开户许可证'
  }
];