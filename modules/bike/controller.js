import { errorResponse, successResponse } from '../../utils/response.js';
import Bike from './schema.js';
import mongoose from 'mongoose';

class BikeController {
  // Get All Bikes
  async getAllBikes(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      const query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { model: { $regex: search, $options: 'i' } },
        ],
      };

      const total = await Bike.countDocuments(query);

      const bikes = await Bike.find(query)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .sort({ createdAt: -1 })
        .lean();

      return successResponse({
        res,
        message: 'Bikes retrieved successfully',
        data: bikes,
        meta: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(total / limitNumber),
        },
        statusCode: 200,
      });
    } catch (error) {
      console.error('Error retrieving bikes:', error);

      return errorResponse({
        res,
        message: 'Internal server error',
        statusCode: 500,
      });
    }
  }

  //` Get Bike by ID
  async getBikeById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorResponse({
          res,
          message: 'Bike ID is required',
          statusCode: 400,
        });
      }

      const objId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null;

      const bike = await Bike.findById(objId).select("-__v").lean();

      if (!bike) {
        return errorResponse({
          res,
          message: 'Bike not found',
          statusCode: 404,
        });
      }

      return successResponse({
        res,
        message: 'Bike retrieved successfully',
        data: bike,
        statusCode: 200,
      });
    } catch (error) {
      console.error('Error retrieving bike:', error);

      return errorResponse({
        res,
        message: 'Internal server error',
        statusCode: 500,
      });
    }
  }

}

export default new BikeController();
