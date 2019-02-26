const db = require('../models');

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find()
            .populate('user', ['username', '_id']);

        res.status(200).json(polls);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.userPolls = async(req, res, next) => {
    try {
        const {id} = req.decoded;

        const user = await db.User.findById(id)
            .populate('polls');

            res.status(200).json(user.polls);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.createPoll = async (req, res, next) => {
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id);

        const { question, options } = req.body;
        const poll = await db.Poll.create({
            question,
            user,
            options: options.map(option => ({option, votes:0}))
        });

        user.polls.push(poll._id);
        await user.save();

        res.status(201).json({...poll._doc, user: user._id});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.getPoll = async (req,res,next) => {
    try {
        const {id} = req.params;

        const poll = await db.Poll.findById(id)
            .populate('user', ['username', '_id']);
        
        if(!poll) throw new Error('El id no corresponde a ninguna encuesta registrada');

        res.status(200).json(poll);
    } catch (error) {
        error.status = 400;
        next(errors);
    }
}

exports.deletePoll = async (req, res, next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;

        const poll = await db.Poll.findById(pollId);

        if(!poll) throw new Error('El id no corresponde a ninguna encuesta registrada'); 
        if(poll.user.toString() !== userId) {
            throw new Error('Acceso denegado');
        }

        await poll.remove();

        res.status(202).json(poll);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.vote = async (req, res, next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;

        const {answer} = req.body;

        if(answer) {
            const poll = await db.Poll.findById(pollId);

            if(!poll) throw new Error('El id no corresponde a ninguna encuesta registrada'); 

            if(poll.voted.filter(
                user => user.toString() === userId).length <= 0) {
                    const vote = poll.options.map(
                        option => {
                            if (option.option === answer) {
                                return {
                                    option: option.option,
                                    _id: option._id,
                                    votes: option.votes + 1
                                }
                            } else {
                                return option;
                            }
                        }
                    );

                    poll.voted.push(userId);
                    poll.options = vote;
                    await poll.save();

                    res.status(202).json(poll)
            } else {
                throw new Error('Ya ha votado en esta encuesta');
            }
        } else {
            throw new Error('Respuesta vacía');
        }
    } catch (error) {
        error.status = 400;
        next(error);
    }
}