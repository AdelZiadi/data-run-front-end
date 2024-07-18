import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../warehouse-item.test-samples';

import { WarehouseItemFormService } from './warehouse-item-form.service';

describe('WarehouseItem Form Service', () => {
  let service: WarehouseItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseItemFormService);
  });

  describe('Service methods', () => {
    describe('createWarehouseItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWarehouseItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
          }),
        );
      });

      it('passing IWarehouseItem should create a new form with FormGroup', () => {
        const formGroup = service.createWarehouseItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            description: expect.any(Object),
          }),
        );
      });
    });

    describe('getWarehouseItem', () => {
      it('should return NewWarehouseItem for default WarehouseItem initial value', () => {
        const formGroup = service.createWarehouseItemFormGroup(sampleWithNewData);

        const warehouseItem = service.getWarehouseItem(formGroup) as any;

        expect(warehouseItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewWarehouseItem for empty WarehouseItem initial value', () => {
        const formGroup = service.createWarehouseItemFormGroup();

        const warehouseItem = service.getWarehouseItem(formGroup) as any;

        expect(warehouseItem).toMatchObject({});
      });

      it('should return IWarehouseItem', () => {
        const formGroup = service.createWarehouseItemFormGroup(sampleWithRequiredData);

        const warehouseItem = service.getWarehouseItem(formGroup) as any;

        expect(warehouseItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWarehouseItem should not enable id FormControl', () => {
        const formGroup = service.createWarehouseItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWarehouseItem should disable id FormControl', () => {
        const formGroup = service.createWarehouseItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
