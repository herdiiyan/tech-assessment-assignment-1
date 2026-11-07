import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetProductInputDTO } from '../../../feature/product/usecase/dtos/get-products.dto';
import { GetProductUsecase } from '../../../feature/product/usecase/get-product.usecase';
import { MockProductRepositoriy } from '../../../feature/product/infrasturcture/mock-product.repository';

const productRepository = new MockProductRepositoriy();
const getProductUseCase = new GetProductUsecase(productRepository);

// Async Action yang memanggil Use Case di luar Controller
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (filters: GetProductInputDTO | undefined) => {
        const data = await getProductUseCase.execute(filters);
        return data;
    }
);
